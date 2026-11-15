const rawApiUrl = (import.meta.env.VITE_API_URL || "")
  .trim()
  .replace(/\/+$/, "");

const isProd = Boolean(import.meta.env.PROD);
const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(rawApiUrl);

let configError = null;
let resolvedApiUrl = rawApiUrl;

if (isProd) {
  if (!rawApiUrl) {
    configError = "Backend API URL (VITE_API_URL) is not configured in Vercel environment variables.";
  } else if (isLocalhost) {
    configError = "Backend API URL (VITE_API_URL) points to localhost in a production build, which cannot be reached by users.";
  }
} else {
  // In development, if VITE_API_URL is empty, default to empty string so Vite proxy forwards /api to localhost:8080
  resolvedApiUrl = rawApiUrl || "";
}

export const API_URL = resolvedApiUrl;

export const isApiConfigured = isProd ? Boolean(rawApiUrl && !isLocalhost) : true;

export const getApiConfigError = () => configError;

export const apiUrl = (path) => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL}${cleanPath}`;
};
