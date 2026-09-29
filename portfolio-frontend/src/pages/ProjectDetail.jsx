import { useState } from "react";
import { FiArrowLeft, FiCheck, FiCode, FiGithub, FiPlayCircle } from "react-icons/fi";
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
import { projects } from "../data/projects";
import ProjectImage from "../components/ProjectImage";
import "./ProjectDetail.css";

// Icon + color for each tech name used in data/projects.js
const TECH = {
  "React.js": { icon: SiReact, color: "#149eca" },
  "Spring Boot": { icon: SiSpringboot, color: "#6db33f" },
  MySQL: { icon: SiMysql, color: "#00758f" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06b6d4" },
  Python: { icon: SiPython, color: "#3776ab" },
  "Scikit-learn": { icon: SiScikitlearn, color: "#f7931e" },
  Flask: { icon: SiFlask, color: "#1f2937" },
  "Node.js": { icon: SiNodedotjs, color: "#5fa04e" },
  "Express.js": { icon: SiExpress, color: "#1f2937" },
  MongoDB: { icon: SiMongodb, color: "#47a248" },
};

export default function ProjectDetail({ id, onBack }) {
  const project = projects.find((p) => p.id === id);
  const [active, setActive] = useState(0);

  if (!project) {
    return (
      <section className="pd">
        <button type="button" className="pd-back" onClick={onBack}>
          <FiArrowLeft aria-hidden="true" /> Back to Projects
        </button>
        <p className="pd-tagline">Project not found.</p>
      </section>
    );
  }

  const shots = project.images.length ? project.images : [null];

  return (
    <section className="pd">
      <div className="pd-grid">
        {/* ---------- Left: header + gallery ---------- */}
        <div className="pd-main">
          <button type="button" className="pd-back" onClick={onBack}>
            <FiArrowLeft aria-hidden="true" /> Back to Projects
          </button>

          <h1 className="pd-title">{project.title}</h1>
          <p className="pd-tagline">{project.tagline}</p>

          <div className="pd-actions">
            <a
              className="pf-btn pf-btn-dark"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              <FiPlayCircle aria-hidden="true" /> Live Demo
            </a>

            <a
              className="pf-btn pf-btn-line"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub aria-hidden="true" /> GitHub
            </a>
            <span className="pd-tag">{project.category}</span>
          </div>

          <div className="pd-shot">
            <div className="pd-shot-main">
              <ProjectImage
                key={active}
                src={shots[active]}
                alt={`${project.title} screenshot ${active + 1}`}
                accent={project.accent}
                icon={project.icon}
              />
            </div>

            {shots.length > 1 && (
              <div className="pd-thumbs">
                {shots.map((src, i) => (
                  <button
                    key={src ? `${src}-${i}` : i}
                    type="button"
                    className="pd-thumb"
                    aria-label={`Show screenshot ${i + 1}`}
                    aria-pressed={active === i}
                    onClick={() => setActive(i)}
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

        {/* ---------- Right: overview, features, tech ---------- */}
        <aside className="pd-side">
          <section>
            <h2 className="pd-h2">Project Overview</h2>
            <p className="pd-overview">{project.overview}</p>
          </section>

          <section>
            <h2 className="pd-h2">Key Features</h2>
            <ul className="pd-features">
              {project.features.map((f) => (
                <li key={f}>
                  <span className="pd-check" aria-hidden="true">
                    <FiCheck />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="pd-h2">Tech Stack</h2>
            <ul className="pd-tech">
              {project.tech.map((name) => {
                const { icon: Icon, color } = TECH[name] || {
                  icon: FiCode,
                  color: "#6b7280",
                };
                return (
                  <li className="pd-tech-item" key={name}>
                    <Icon aria-hidden="true" style={{ color }} />
                    {name}
                  </li>
                );
              })}
            </ul>
          </section>
        </aside>
      </div>
    </section>
  );
}