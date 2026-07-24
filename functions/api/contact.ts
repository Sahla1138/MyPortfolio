export async function onRequestPost(context: any) {
  try {
    console.log("Environment:", {
      apiBase: context.env.RAISUITE_API_BASE,
      tenant: context.env.TENANT_ID,
      hasApiKey: !!context.env.RAISUITE_API_KEY,
    });

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

    const text = await response.text();

    console.log("Raisuite Status:", response.status);
    console.log("Raisuite Response:", text);

    return new Response(text, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (err: any) {
    console.error("Function Error:", err);

    return new Response(
      JSON.stringify({
        error: err.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}