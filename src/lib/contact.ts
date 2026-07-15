

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
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown network error";
    throw new Error(`Network request failed: ${message}`);
  }
}