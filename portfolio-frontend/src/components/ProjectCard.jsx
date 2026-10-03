import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import ProjectImage from "./ProjectImage";
import "./ProjectCard.css";

export default function ProjectCard({ project, onOpen }) {
  const stop = (e) => {
    e.stopPropagation();
  };

  const handleOpen = () => {
    if (typeof onOpen === "function") {
      onOpen(project.id);
    }
  };

  const image =
    Array.isArray(project.images) &&
    project.images.length > 0
      ? project.images[0]
      : null;

  return (
    <article
      className="pc"
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpen();
        }
      }}
    >
      <div className="pc-media">
        <ProjectImage
          src={image}
          alt={`${project.title} preview`}
          accent={project.accent}
          icon={project.icon}
        />
      </div>

      <div className="pc-body">
        <div className="pc-head">
          <h3 className="pc-h">
            <button
              type="button"
              className="pc-name"
              onClick={(e) => {
                e.stopPropagation();
                handleOpen();
              }}
            >
              {project.title}
            </button>
          </h3>

          {project.category && (
            <span className="pc-tag">
              {project.category}
            </span>
          )}
        </div>

        <p className="pc-desc">
          {project.summary}
        </p>

        <div className="pc-links">
          {project.liveUrl && (
            <a
              className="pc-link pc-link-primary"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={stop}
            >
              Live Demo
              <FiArrowUpRight aria-hidden="true" />
            </a>
          )}

          {project.githubUrl && (
            <a
              className="pc-link"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={stop}
            >
              <FiGithub aria-hidden="true" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}