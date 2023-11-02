import { useEffect, useRef } from "react";

export interface AppResponse {
  ok?: boolean;
  error?: string;
  message?: string;
}

export interface FormError {
  unknown?: string;
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
