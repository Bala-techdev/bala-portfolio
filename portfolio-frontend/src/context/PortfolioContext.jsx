import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { fetchPortfolio } from "../api/portfolioApi";
import { fallbackPortfolio } from "../data/portfolioData";

const PortfolioContext = createContext(null);
const CACHE_KEY = "portfolio-v2-cache";
// Render free-tier cold starts take 30-50s; 60s allows sufficient wakeup time
const REQUEST_TIMEOUT_MS = 60000;

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
  if (!Array.isArray(live)) {
    return fallback;
  }

  return live.filter((item) => item && typeof item === "object");
}

function mergeProjects(fallback, live) {
  if (!Array.isArray(live)) {
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

  return live
    .filter((item) => item && typeof item === "object")
    .map((item) => {
      const key = String(item.slug ?? item.id ?? "");
      const fallbackItem = fallback.find(
        (candidate) =>
          String(candidate.slug ?? candidate.id ?? "") === key
      );
      liveByKey.delete(key);
      return fallbackItem ? { ...fallbackItem, ...item } : item;
    });
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
    research: mergeCollection(
      fallbackPortfolio.research,
      liveData.blog
    ),
  };
}

function cachePortfolio(portfolio) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(portfolio));
  } catch (error) {
    console.warn("Portfolio cache could not be saved:", error);
  }
}

export function PortfolioProvider({ children }) {
  const cachedPortfolio = readCachedPortfolio();
  const [portfolio, setPortfolio] = useState(
    () => cachedPortfolio || clonePortfolio(fallbackPortfolio)
  );
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState(
    () => (cachedPortfolio ? "cached" : "loading")
  );
  const [syncError, setSyncError] = useState("");
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const activeControllerRef = useRef(null);

  const refresh = useCallback(() => {
    setReloadTrigger((count) => count + 1);
  }, []);

  useEffect(() => {
    let unmounted = false;
    const controller = new AbortController();
    activeControllerRef.current = controller;

    let timedOut = false;
    const timeoutId = window.setTimeout(() => {
      timedOut = true;
      controller.abort("TIMEOUT");
    }, REQUEST_TIMEOUT_MS);

    const executeFetch = async () => {
      try {
        let data = null;
        for (let attempt = 0; attempt <= 1; attempt++) {
          try {
            data = await fetchPortfolio({ signal: controller.signal });
            break;
          } catch (fetchErr) {
            if (controller.signal.aborted) {
              throw fetchErr;
            }
            if (attempt < 1) {
              console.info("Retrying portfolio fetch after Render cold start wakeup...");
              await new Promise((resolve) => window.setTimeout(resolve, 2000));
            } else {
              throw fetchErr;
            }
          }
        }

        if (unmounted || controller.signal.aborted) {
          return;
        }

        const liveData = normalizeLivePortfolio(data);
        const mergedPortfolio = mergePortfolio(liveData);

        setPortfolio(mergedPortfolio);
        setSyncStatus("live");
        setSyncError("");
        cachePortfolio(mergedPortfolio);
        setLoading(false);
      } catch (err) {
        // If aborted because of React StrictMode unmount or superseded, silently return
        if (unmounted || (controller.signal.aborted && !timedOut)) {
          return;
        }

        setLoading(false);

        const isTimeout = timedOut || err.name === "AbortError";
        const message = isTimeout
          ? "Backend connection timed out (server may be waking up from sleep)"
          : err.message || "Unable to synchronize portfolio data";

        console.warn("Portfolio data loading failed:", message);
        setSyncError(message);

        // Distinguish Fallback from Cached and Configuration Error
        const hasCached = Boolean(readCachedPortfolio());
        if (hasCached) {
          setSyncStatus("cached");
        } else if (err.message && err.message.includes("VITE_API_URL")) {
          setSyncStatus("error");
        } else {
          setSyncStatus("fallback");
        }
      } finally {
        window.clearTimeout(timeoutId);
      }
    };

    executeFetch();

    const handlePortfolioChanged = () => {
      refresh();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setSyncStatus((current) => {
          if (current !== "live") {
            refresh();
          }
          return current;
        });
      }
    };

    window.addEventListener("portfolio:changed", handlePortfolioChanged);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      unmounted = true;
      controller.abort("UNMOUNT");
      window.removeEventListener("portfolio:changed", handlePortfolioChanged);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [reloadTrigger, refresh]);

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        loading,
        error: syncError,
        syncStatus,
        syncError,
        refresh,
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