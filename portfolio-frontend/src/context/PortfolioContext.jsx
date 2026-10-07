import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../api/api";

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState({
    projects: [],
    skills: [],
    education: [],
    experience: [],
    certificates: [],
    blog: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadPortfolioData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(apiUrl("/api/v1/portfolio"));

        if (!response.ok) {
          throw new Error("Failed to load portfolio data");
        }

        const data = await response.json();

        if (!cancelled) {
          setPortfolio({
            projects: Array.isArray(data.projects)
              ? data.projects
              : [],

            skills: Array.isArray(data.skills)
              ? data.skills
              : [],

            education: Array.isArray(data.education)
              ? data.education
              : [],

            experience: Array.isArray(data.experience)
              ? data.experience
              : [],

            certificates: Array.isArray(data.certificates)
              ? data.certificates
              : [],

            blog: Array.isArray(data.blog)
              ? data.blog
              : [],
          });
        }
      } catch (err) {
        console.error("Portfolio data loading failed:", err);

        if (!cancelled) {
          setError(err.message || "Unable to load portfolio data");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
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