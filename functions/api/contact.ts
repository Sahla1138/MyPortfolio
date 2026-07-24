export async function onRequestPost(context: any) {
  const body = await context.request.json();

  const response = await fetch(
    `${context.env.RAISUITE_API_BASE}/crm/enquiries/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${context.env.RAISUITE_API_KEY}`,
      },
      body: JSON.stringify({
        tenant: Number(context.env.TENANT_ID),
        ...body,
      }),
    }
  );

  return new Response(await response.text(), {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}