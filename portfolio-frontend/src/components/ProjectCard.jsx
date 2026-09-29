import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import ProjectImage from "./ProjectImage";
import "./ProjectCard.css";

export default function ProjectCard({ project, onOpen }) {
  // Links inside the card should not also open the detail page
  const stop = (e) => e.stopPropagation();

  return (
    /* The whole card is clickable. The title button makes it keyboard friendly. */
    <article className="pc" onClick={() => onOpen(project.id)}>
      <div className="pc-media">
        <ProjectImage
          src={project.images[0]}
          alt={`${project.title} preview`}
          accent={project.accent}
          icon={project.icon}
        />
      </div>

      <div className="pc-body">
        <div className="pc-head">
          <h3 className="pc-h">
            <button type="button" className="pc-name">
              {project.title}
            </button>
          </h3>
          <span className="pc-tag">{project.category}</span>
        </div>

        <p className="pc-desc">{project.summary}</p>

        <div className="pc-links">
          <a
            className="pc-link pc-link-primary"
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            onClick={stop}
          >
            Live Demo <FiArrowUpRight aria-hidden="true" />
          </a>

          <a
            className="pc-link"
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={stop}
          >
            <FiGithub aria-hidden="true" /> GitHub
          </a>
        </div>
      </div>
    </article>
  );
}