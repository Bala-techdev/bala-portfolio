import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiCheck,
  FiCode,
  FiGithub,
  FiPlayCircle,
} from "react-icons/fi";

import {
  SiReact,
  SiSpringboot,
  SiMysql,
  SiTailwindcss,
  SiPython,
  SiScikitlearn,
  SiFlask,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
} from "react-icons/si";

import ProjectImage from "../components/ProjectImage";
import "./ProjectDetail.css";

// Icon + color for technology names
const TECH = {
  "React.js": {
    icon: SiReact,
    color: "#149eca",
  },

  "Spring Boot": {
    icon: SiSpringboot,
    color: "#6db33f",
  },

  MySQL: {
    icon: SiMysql,
    color: "#00758f",
  },

  "Tailwind CSS": {
    icon: SiTailwindcss,
    color: "#06b6d4",
  },

  Python: {
    icon: SiPython,
    color: "#3776ab",
  },

  "Scikit-learn": {
    icon: SiScikitlearn,
    color: "#f7931e",
  },

  Flask: {
    icon: SiFlask,
    color: "#1f2937",
  },

  "Node.js": {
    icon: SiNodedotjs,
    color: "#5fa04e",
  },

  "Express.js": {
    icon: SiExpress,
    color: "#1f2937",
  },

  MongoDB: {
    icon: SiMongodb,
    color: "#47a248",
  },
};

export default function ProjectDetail({ id, onBack }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadProject = async () => {
      try {
        setLoading(true);
        setError("");

        // Get all projects from backend
        const response = await fetch(
          "/api/v1/projects",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}`
          );
        }

        const projects = await response.json();

        // App currently passes numeric project ID
        const foundProject = projects.find(
          (item) => String(item.id) === String(id)
        );

        if (!cancelled) {
          if (foundProject) {
            setProject(foundProject);
          } else {
            setProject(null);
            setError("Project not found.");
          }
        }
      } catch (err) {
        if (!cancelled) {
          console.error(
            "Failed to load project:",
            err
          );

          setError(
            "Unable to load project."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProject();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // Reset gallery when project changes
  useEffect(() => {
    setActive(0);
  }, [project]);

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <section className="pd">
        <button
          type="button"
          className="pd-back"
          onClick={onBack}
        >
          <FiArrowLeft aria-hidden="true" />
          Back to Projects
        </button>

        <p className="pd-tagline">
          Loading project...
        </p>
      </section>
    );
  }

  // =========================
  // Error / Not Found
  // =========================
  if (!project) {
    return (
      <section className="pd">
        <button
          type="button"
          className="pd-back"
          onClick={onBack}
        >
          <FiArrowLeft aria-hidden="true" />
          Back to Projects
        </button>

        <p className="pd-tagline">
          {error || "Project not found."}
        </p>
      </section>
    );
  }

  // =========================
  // Images
  // =========================
  const shots =
    Array.isArray(project.images) &&
    project.images.length > 0
      ? project.images
      : [null];

  // =========================
  // Render
  // =========================
  return (
    <section className="pd">
      <div className="pd-grid">
        {/* =========================
            Left: Header + Gallery
            ========================= */}
        <div className="pd-main">
          <button
            type="button"
            className="pd-back"
            onClick={onBack}
          >
            <FiArrowLeft aria-hidden="true" />
            Back to Projects
          </button>

          <h1 className="pd-title">
            {project.title}
          </h1>

          {project.tagline && (
            <p className="pd-tagline">
              {project.tagline}
            </p>
          )}

          <div className="pd-actions">
            {project.liveUrl && (
              <a
                className="pf-btn pf-btn-dark"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FiPlayCircle
                  aria-hidden="true"
                />
                Live Demo
              </a>
            )}

            {project.githubUrl && (
              <a
                className="pf-btn pf-btn-line"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FiGithub
                  aria-hidden="true"
                />
                GitHub
              </a>
            )}

            {project.category && (
              <span className="pd-tag">
                {project.category}
              </span>
            )}
          </div>

          {/* Gallery */}
          <div className="pd-shot">
            <div className="pd-shot-main">
              <ProjectImage
                key={`${project.id}-${active}`}
                src={shots[active]}
                alt={`${project.title} screenshot ${
                  active + 1
                }`}
                accent={project.accent}
                icon={project.icon}
              />
            </div>

            {shots.length > 1 && (
              <div className="pd-thumbs">
                {shots.map((src, index) => (
                  <button
                    key={
                      src
                        ? `${src}-${index}`
                        : index
                    }
                    type="button"
                    className="pd-thumb"
                    aria-label={`Show screenshot ${
                      index + 1
                    }`}
                    aria-pressed={
                      active === index
                    }
                    onClick={() =>
                      setActive(index)
                    }
                  >
                    <ProjectImage
                      src={src}
                      alt=""
                      accent={project.accent}
                      icon={project.icon}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* =========================
            Right: Project Information
            ========================= */}
        <aside className="pd-side">
          {/* Overview */}
          {project.overview && (
            <section>
              <h2 className="pd-h2">
                Project Overview
              </h2>

              <p className="pd-overview">
                {project.overview}
              </p>
            </section>
          )}

          {/* Features */}
          {Array.isArray(project.features) &&
            project.features.length > 0 && (
              <section>
                <h2 className="pd-h2">
                  Key Features
                </h2>

                <ul className="pd-features">
                  {project.features.map(
                    (feature, index) => (
                      <li
                        key={`${feature}-${index}`}
                      >
                        <span
                          className="pd-check"
                          aria-hidden="true"
                        >
                          <FiCheck />
                        </span>

                        {feature}
                      </li>
                    )
                  )}
                </ul>
              </section>
            )}

          {/* Tech Stack */}
          {Array.isArray(project.tech) &&
            project.tech.length > 0 && (
              <section>
                <h2 className="pd-h2">
                  Tech Stack
                </h2>

                <ul className="pd-tech">
                  {project.tech.map(
                    (name) => {
                      const {
                        icon: Icon,
                        color,
                      } =
                        TECH[name] || {
                          icon: FiCode,
                          color:
                            "#6b7280",
                        };

                      return (
                        <li
                          className="pd-tech-item"
                          key={name}
                        >
                          <Icon
                            aria-hidden="true"
                            style={{
                              color,
                            }}
                          />

                          {name}
                        </li>
                      );
                    }
                  )}
                </ul>
              </section>
            )}
        </aside>
      </div>
    </section>
  );
}