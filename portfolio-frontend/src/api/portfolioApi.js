import { apiUrl, isApiConfigured } from "./api";

export async function fetchPortfolio({ signal } = {}) {
  if (!isApiConfigured) {
    throw new Error(
      "VITE_API_URL is not configured for this Vercel deployment."
    );
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
