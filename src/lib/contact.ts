

export type ContactPayload = {
  name: string;
  email: string;
  mobile: string;
  message: string;
  
};

export async function submitContact(data: ContactPayload): Promise<Response> {
  const apiBase = process.env.NEXT_PUBLIC_RAISUITE_API_BASE;
  const tenant = process.env.NEXT_PUBLIC_TENANT_ID;

  console.log("API Base:", apiBase);
  console.log("Tenant:", tenant);

  const payload = {
    tenant: Number(tenant),
    ...data,
  };

  return fetch(`${apiBase}/crm/enquiries/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(payload),
  });
}