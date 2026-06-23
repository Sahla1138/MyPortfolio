'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '@/components/form/TextField';
import TextArea from '@/components/form/TextArea';
import Button from '@/components/ui/Button';
import Alert from '@/components/feedback/Alert';
import { useState } from 'react';

const ContactSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactValues = z.infer<typeof ContactSchema>;

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<ContactValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { name: '', email: '', message: '' }
  });

  async function onSubmit(values: ContactValues) {
    setStatus('idle');
    setErrorMessage(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setErrorMessage(data.error || 'Unexpected error');
        return;
      }
      setStatus('success');
      form.reset();
    } catch (e: unknown) {
      setStatus('error');
      const message = e instanceof Error ? e.message : 'Network error';
      setErrorMessage(message);
    }
  }

  return (
    <div className=" py-20 px-6 bg-gray-900" id="contact" aria-labelledby="contact-heading">
      <div className="max-w-2xl mx-auto">
      <h2 className="text-4xl text-white font-bold mb-6">Contact Us</h2>
      <p className="text-gray-300 mb-8">Send an enquiry. This posts to the multi-tenant contact endpoint and will eventually forward to Raisuite ERP.</p>
      {status === 'success' && <Alert type="success" message="Enquiry submitted successfully." />}
      {status === 'error' && <Alert type="error" message={errorMessage || 'Failed to submit.'} />}

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-lg"
        aria-describedby="form-help"
        noValidate
      >
        <TextField className="w-full p-4 rounded bg-gray-800 border border-gray-700"
          label="Name"
          {...form.register('name')}
          error={form.formState.errors.name?.message}
        />
        <TextField className="w-full p-4 rounded bg-gray-800 border border-gray-700"
          label="Email"
          type="email"
          {...form.register('email')}
          error={form.formState.errors.email?.message}
        />
        <TextArea className="w-full p-4 rounded bg-gray-800 border border-gray-700"
          label="Message"
          rows={5}
          {...form.register('message')}
          error={form.formState.errors.message?.message}
        />
        <Button className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition" type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
        <div id="form-help" className="text-xs text-gray-500">
          We will respond as soon as possible. Please do not include sensitive credentials.
        </div>
      </form>
      </div>
    </div>
  );
}