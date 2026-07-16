

export type ContactPayload = {
  name: string;
  email: string;
  mobile: string;
  message: string;
  
};

export async function submitContact(
  data: ContactPayload
): Promise<Response> {

  try {
    const apiBase = process.env.NEXT_PUBLIC_RAISUITE_API_BASE;
      const payload = {
      tenant: Number(process.env.NEXT_PUBLIC_TENANT_ID), // <-- Add tenant here
      ...data,
    };
    
    
    
    const response = await fetch( `${apiBase}/crm/enquiries/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        
      },
      body: JSON.stringify(payload),
    });

    const result = await response.text();

console.log("Status:", response.status);
console.log("Response:", result);

    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown network error";
    throw new Error(`Network request failed: ${message}`);
  }
}