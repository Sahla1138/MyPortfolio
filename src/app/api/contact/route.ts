import * as z from 'zod';
import { rateLimitCheck } from '@/lib/rateLimit';
import { getEnv } from '@/lib/env';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

const ContactSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email(),
  mobile: z.string().min(10).max(10),
  message: z.string().min(10).max(5000)
});

async function verifyTurnstile(): Promise<boolean> {
  return true;
}

export async function POST(req: Request) {
  const env = getEnv();
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.issues.map(i => i.message) },
      { status: 400 }
    );
  }

  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const limited = rateLimitCheck(ip);
  if (limited) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const captchaOk = await verifyTurnstile();
  if (!captchaOk) {
    return NextResponse.json({ error: 'Captcha failed' }, { status: 403 });
  }

  const { name, email, mobile, message } = parsed.data;
  const payload = {
    tenant: env.TENANT_ID,
    name,
    email,
    mobile,
    message,
    meta: {
      ua: req.headers.get('user-agent'),
      timestamp: new Date().toISOString()
    }
  };

  
  const upstreamUrl = `${env.RAISUITE_API_BASE.replace(/\/$/, '')}/crm/enquiries/`;

  try {
    const upstream = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Tenant": env.TENANT_ID
      },
      body: JSON.stringify(payload)
    });

    if (!upstream.ok) {
      const responseText = await upstream.text().catch(() => '');
      console.error('[contact] Upstream error', { status: upstream.status, body: responseText });
      return NextResponse.json(
        { error: 'Upstream error', details: responseText || undefined },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error('[contact] Network error', error);
    return NextResponse.json({ error: 'Network error' }, { status: 502 });
  }
  

  console.log('[contact] Received enquiry', payload);

  return NextResponse.json({ status: 'ok' }, { status: 200 });
}