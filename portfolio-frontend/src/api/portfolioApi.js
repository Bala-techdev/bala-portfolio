import { apiUrl, isApiConfigured, getApiConfigError } from "./api";

export async function fetchPortfolio({ signal } = {}) {
  if (!isApiConfigured) {
    const errorMsg = getApiConfigError?.() || "VITE_API_URL is not configured for this Vercel deployment.";
    throw new Error(errorMsg);
  }

  const response = await fetch(
    apiUrl(`/api/v1/portfolio?ts=${Date.now()}`),
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
      signal,
    }
  );

  if (!response.ok) {
    throw new Error(`Portfolio API returned HTTP ${response.status}`);
  }

  return response.json();
}
