import { useState } from "react";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { CATEGORIES, projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import "./Projects.css";

const PER_PAGE = 3; // cards per page
const SOURCE_URL = "https://github.com/your-username"; // "View Source" button

export default function Projects({ onOpenProject }) {
  const [category, setCategory] = useState("All");
  const [pageNo, setPageNo] = useState(1);

  const filtered =
    category === "All" ? projects : projects.filter((p) => p.category === category);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((pageNo - 1) * PER_PAGE, pageNo * PER_PAGE);

  const pickCategory = (c) => {
    setCategory(c);
    setPageNo(1);
  };

  return (
    <section className="pj">
      <div className="pj-top">
        <div>
          <h1 className="pj-title">Projects</h1>
          <p className="pj-sub">
            A collection of my work. Each project represents a problem, a solution, and a
            learning experience.
          </p>
        </div>

        <a className="pj-source" href={SOURCE_URL} target="_blank" rel="noreferrer">
          View Source <FiArrowUpRight aria-hidden="true" />
        </a>
      </div>

      <div className="pj-filters" role="group" aria-label="Filter projects">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className="pj-chip"
            aria-pressed={category === c}
            onClick={() => pickCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="pj-grid">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={onOpenProject} />
          ))}
        </div>
      ) : (
        <p className="pj-empty">No projects in this category yet.</p>
      )}

      {totalPages > 1 && (
        <div className="pj-pager">
          <button
            type="button"
            className="pj-page-btn"
            aria-label="Previous page"
            disabled={pageNo === 1}
            onClick={() => setPageNo((n) => n - 1)}
          >
            <FiChevronLeft />
          </button>
          <button
            type="button"
            className="pj-page-btn"
            aria-label="Next page"
            disabled={pageNo === totalPages}
            onClick={() => setPageNo((n) => n + 1)}
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </section>
  );
}