import { useEffect, useRef } from "react";

export interface ApiResponse {
  ok?: boolean;
  error?: string;
  message?: string;
}

export interface FormError {
  email?: string;
  unknown?: string;
  password?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

export async function postRequest(
  api: string,
  body: any,
  json: boolean = true
): Promise<any> {
  const url = `${API_URL}${api}`;
  let headers;

  if (json) {
    body = JSON.stringify(body);
    headers = {
      "Content-Type": "application/json",
    };
  }

  return await fetch(url, {
    method: "POST",
    headers,
    body,
  });
}

export function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  callback: () => void
): void {
  // Store the callback in a ref so we can access the latest version without resetting the event listener
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callbackRef.current();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
