

export type ContactPayload = {
  name: string;
  email: string;
  mobile: string;
  message: string;
  
};

export async function submitContact(data: ContactPayload) {
  return fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}