export interface AppResponse {
  ok?: boolean;
  error?: string;
  message?: string;
}

export interface FormError {
  email?: string;
  password?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

export function postRequest(api: string, body: any) {
  const url = `${API_URL}${api}`;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
