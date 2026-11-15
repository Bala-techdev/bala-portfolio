const API_URL = (import.meta.env.VITE_API_URL || "")
  .trim()
  .replace(/\/+$/, "");

export const isApiConfigured =
  Boolean(API_URL) || !import.meta.env.PROD;

export const apiUrl = (path) => `${API_URL}${path}`;
