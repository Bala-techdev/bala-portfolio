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

        const [
          projectsResponse,
          skillsResponse,
          educationResponse,
          experienceResponse,
          certificatesResponse,
          blogResponse,
        ] = await Promise.all([
          fetch(apiUrl("/api/v1/projects")),
          fetch(apiUrl("/api/v1/skills")),
          fetch(apiUrl("/api/v1/education")),
          fetch(apiUrl("/api/v1/experience")),
          fetch(apiUrl("/api/v1/certificates")),
          fetch(apiUrl("/api/v1/blog")),
        ]);

        if (
          !projectsResponse.ok ||
          !skillsResponse.ok ||
          !educationResponse.ok ||
          !experienceResponse.ok ||
          !certificatesResponse.ok ||
          !blogResponse.ok
        ) {
          throw new Error("Failed to load portfolio data");
        }

        const [
          projects,
          skills,
          education,
          experience,
          certificates,
          blog,
        ] = await Promise.all([
          projectsResponse.json(),
          skillsResponse.json(),
          educationResponse.json(),
          experienceResponse.json(),
          certificatesResponse.json(),
          blogResponse.json(),
        ]);

        if (!cancelled) {
  setPortfolio({
    projects: Array.isArray(projects) ? projects : [],
    skills: Array.isArray(skills) ? skills : [],
    education: Array.isArray(education) ? education : [],
    experience: Array.isArray(experience) ? experience : [],
    certificates: Array.isArray(certificates)
      ? certificates
      : [],
    blog: Array.isArray(blog)
      ? blog
      : Array.isArray(blog?.content)
        ? blog.content
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