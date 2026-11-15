import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../api/api";
import { fallbackPortfolio } from "../data/portfolioData";

const PortfolioContext = createContext(null);
const CACHE_KEY = "portfolio-v2-cache";
const REQUEST_TIMEOUT_MS = 8000;

function clonePortfolio(portfolio) {
  return JSON.parse(JSON.stringify(portfolio));
}

function readCachedPortfolio() {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (!cached) {
      return null;
    }

    const parsed = JSON.parse(cached);
    return isPortfolioShape(parsed) ? parsed : null;
  } catch (error) {
    console.warn("Portfolio cache could not be read:", error);
    return null;
  }
}

function isPortfolioShape(value) {
  return (
    value &&
    typeof value === "object" &&
    Array.isArray(value.projects) &&
    Array.isArray(value.skills) &&
    Array.isArray(value.education) &&
    Array.isArray(value.experience) &&
    Array.isArray(value.certificates) &&
    Array.isArray(value.blog) &&
    Array.isArray(value.research)
  );
}

function asArray(value) {
  return Array.isArray(value) ? value : null;
}

function normalizeBlog(value) {
  if (Array.isArray(value)) {
    return value;
  }

  return asArray(value?.content);
}

function mergeCollection(fallback, live) {
  if (!Array.isArray(live) || live.length === 0) {
    return fallback;
  }

  return live.filter((item) => item && typeof item === "object");
}

function mergeProjects(fallback, live) {
  if (!Array.isArray(live) || live.length === 0) {
    return fallback;
  }

  const liveByKey = new Map(
    live
      .filter((item) => item && typeof item === "object")
      .map((item) => [
        String(item.slug ?? item.id ?? ""),
        item,
      ])
  );

  const mergedFallback = fallback.map((item) => {
    const key = String(item.slug ?? item.id ?? "");
    const liveItem = liveByKey.get(key);

    if (!liveItem) {
      return item;
    }

    liveByKey.delete(key);
    return { ...item, ...liveItem };
  });

  return [...mergedFallback, ...liveByKey.values()];
}

function normalizeLivePortfolio(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Portfolio API returned an invalid response");
  }

  const blog = normalizeBlog(data.blog);
  const collections = {
    projects: asArray(data.projects),
    skills: asArray(data.skills),
    education: asArray(data.education),
    experience: asArray(data.experience),
    certificates: asArray(data.certificates),
    blog,
  };

  if (Object.values(collections).every((collection) => collection === null)) {
    throw new Error("Portfolio API returned no usable collections");
  }

  return collections;
}

function mergePortfolio(liveData) {
  return {
    profile: fallbackPortfolio.profile,
    projects: mergeProjects(
      fallbackPortfolio.projects,
      liveData.projects
    ),
    skills: mergeCollection(fallbackPortfolio.skills, liveData.skills),
    education: mergeCollection(
      fallbackPortfolio.education,
      liveData.education
    ),
    experience: mergeCollection(
      fallbackPortfolio.experience,
      liveData.experience
    ),
    certificates: mergeCollection(
      fallbackPortfolio.certificates,
      liveData.certificates
    ),
    blog: mergeCollection(fallbackPortfolio.blog, liveData.blog),
    publications: mergeCollection(
      fallbackPortfolio.publications,
      liveData.blog
    ),
    research: fallbackPortfolio.research,
  };
}

function cachePortfolio(portfolio) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(portfolio));
  } catch (error) {
    console.warn("Portfolio cache could not be saved:", error);
  }
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    timeoutMs
  );

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState(
    () => readCachedPortfolio() || clonePortfolio(fallbackPortfolio)
  );
  const [loading] = useState(false);
  const [error, setError] = useState("");
  const [syncStatus, setSyncStatus] = useState(
    () => (readCachedPortfolio() ? "cached" : "cached")
  );
  const [syncError, setSyncError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadPortfolioData = async () => {
      try {
        setError("");
        setSyncError("");

        const response = await fetchWithTimeout(
          apiUrl("/api/v1/portfolio"),
          REQUEST_TIMEOUT_MS
        );

        if (!response.ok) {
          throw new Error(`Portfolio API returned HTTP ${response.status}`);
        }

        const data = await response.json();
        const liveData = normalizeLivePortfolio(data);
        const mergedPortfolio = mergePortfolio(liveData);

        if (!cancelled) {
          setPortfolio(mergedPortfolio);
          setSyncStatus("live");
          cachePortfolio(mergedPortfolio);
        }
      } catch (err) {
        console.error("Portfolio data loading failed:", err);

        if (!cancelled) {
          setError("");
          setSyncError(
            err.name === "AbortError"
              ? "Portfolio API request timed out"
              : err.message || "Unable to synchronize portfolio data"
          );
          setSyncStatus("cached");
        }
      }
    };

    loadPortfolioData();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        loading,
        error,
        syncStatus,
        syncError,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error(
      "usePortfolio must be used inside PortfolioProvider"
    );
  }

  return context;
}