import { useEffect, useMemo, useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import {
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import ProjectCard from "../components/ProjectCard";
import "./Projects.css";

const PER_PAGE = 3;
const SOURCE_URL = "https://github.com/your-username";

export default function Projects({ onOpenProject }) {
  const { portfolio, loading, error } = usePortfolio();

  const projects = portfolio.projects;

  const [category, setCategory] = useState("All");
  const [pageNo, setPageNo] = useState(1);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        projects
          .map((project) => project.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (category === "All") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === category
    );
  }, [projects, category]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / PER_PAGE)
  );

  const visibleProjects = filteredProjects.slice(
    (pageNo - 1) * PER_PAGE,
    pageNo * PER_PAGE
  );

  const pickCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    setPageNo(1);
  };

  // Prevent invalid page after adding/deleting projects
  useEffect(() => {
    if (pageNo > totalPages) {
      setPageNo(totalPages);
    }
  }, [pageNo, totalPages]);

  return (
    <section className="pj">
      <div className="pj-top">
        <div>
          <h1 className="pj-title">Projects</h1>

          <p className="pj-sub">
            A collection of my work. Each project represents a
            problem, a solution, and a learning experience.
          </p>
        </div>

        <a
          className="pj-source"
          href={SOURCE_URL}
          target="_blank"
          rel="noreferrer"
        >
          View Source
          <FiArrowUpRight aria-hidden="true" />
        </a>
      </div>

      {loading && (
        <p className="pj-state">
          Loading projects...
        </p>
      )}

      {error && (
        <p className="pj-state pj-error">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <div
            className="pj-filters"
            role="group"
            aria-label="Filter projects"
          >
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className="pj-chip"
                aria-pressed={category === item}
                onClick={() => pickCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {visibleProjects.length > 0 ? (
            <div className="pj-grid">
              {visibleProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={onOpenProject}
                />
              ))}
            </div>
          ) : (
            <p className="pj-empty">
              No projects in this category yet.
            </p>
          )}

          {totalPages > 1 && (
            <div className="pj-pager">
              <button
                type="button"
                className="pj-page-btn"
                aria-label="Previous page"
                disabled={pageNo === 1}
                onClick={() =>
                  setPageNo((current) => current - 1)
                }
              >
                <FiChevronLeft />
              </button>

              <span className="pj-page-number">
                {pageNo} / {totalPages}
              </span>

              <button
                type="button"
                className="pj-page-btn"
                aria-label="Next page"
                disabled={pageNo === totalPages}
                onClick={() =>
                  setPageNo((current) => current + 1)
                }
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}