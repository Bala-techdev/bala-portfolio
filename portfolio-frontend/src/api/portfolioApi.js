import { apiUrl } from "./api";

export async function fetchPortfolio({ signal } = {}) {
  const response = await fetch(apiUrl("/api/v1/portfolio"), {
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-cache",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Portfolio API returned HTTP ${response.status}`);
  }

  return response.json();
}
