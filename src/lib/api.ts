"use client";
import { useAuthStore } from "@/store/useAuthStore";

export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = useAuthStore.getState().token;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    useAuthStore.getState().clearToken();
    window.location.href = "/login";
  }

  return res;
}
