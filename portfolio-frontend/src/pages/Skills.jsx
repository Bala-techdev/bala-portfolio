
import { useEffect, useState } from "react";
import {
  FiDownload,
  FiGlobe,
  FiKey,
  FiShield,
  FiTerminal,
} from "react-icons/fi";

import {
  FaJava,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaGitAlt,
  FaGithub,
  FaDocker,
} from "react-icons/fa";

import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiTailwindcss,
  SiSpringboot,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiPostman,
} from "react-icons/si";

import { VscVscode } from "react-icons/vsc";

import "./Skills.css";

const PDF = "/skills.pdf";
const PANEL_IMAGE = "/skills.jpg";
const QUOTE =
  "A combination of technologies I work with to turn ideas into reality.";

// Icon + brand color for each "icon" key returned by the backend
const ICONS = {
  java: { icon: FaJava, color: "#ea2d2e" },
  javascript: { icon: SiJavascript, color: "#e8b900" },
  typescript: { icon: SiTypescript, color: "#3178c6" },
  python: { icon: SiPython, color: "#3776ab" },
  react: { icon: FaReact, color: "#149eca" },
  html: { icon: FaHtml5, color: "#e34f26" },
  css: { icon: FaCss3Alt, color: "#1572b6" },
  tailwind: { icon: SiTailwindcss, color: "#06b6d4" },
  bootstrap: { icon: FaBootstrap, color: "#7952b3" },
  springboot: { icon: SiSpringboot, color: "#6db33f" },
  rest: { icon: FiGlobe, color: "#2563eb" },
  security: { icon: FiShield, color: "#6db33f" },
  jwt: { icon: FiKey, color: "#d63aff" },
  mysql: { icon: SiMysql, color: "#00758f" },
  mongodb: { icon: SiMongodb, color: "#47a248" },
  redis: { icon: SiRedis, color: "#dc382d" },
  git: { icon: FaGitAlt, color: "#f05032" },
  github: { icon: FaGithub, color: "#111827" },
  docker: { icon: FaDocker, color: "#2496ed" },
  postman: { icon: SiPostman, color: "#ff6c37" },
  vscode: { icon: VscVscode, color: "#007acc" },
};

function Skill({ name, icon, abbr }) {
  const found = ICONS[icon];
  const Icon = found ? found.icon : null;

  return (
    <li className="sk-item">
      <span className="sk-tile">
        {Icon ? (
          <Icon
            aria-hidden="true"
            style={{ color: found.color }}
          />
        ) : (
          <b className="sk-abbr" aria-hidden="true">
            {abbr || name.slice(0, 2)}
          </b>
        )}
      </span>

      <span className="sk-name">{name}</span>
    </li>
  );
}

export default function Skills() {
  const [skillGroups, setSkillGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/v1/skills")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        setSkillGroups(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load skills:", err);
        setError("Unable to load skills.");
        setLoading(false);
      });
  }, []);

  return (
    <section className="sk">
      <div className="sk-grid">
        {/* ---------- Left: heading + skill groups ---------- */}
        <div className="sk-main">
          <h1 className="sk-title">Skills</h1>

          <p className="sk-sub">
            Technologies I work with to build amazing products.
          </p>

          <div className="sk-groups">
            {loading && <p>Loading skills...</p>}

            {error && <p>{error}</p>}

            {!loading &&
              !error &&
              skillGroups.map((group) => (
                <section
                  className="sk-group"
                  key={group.id}
                  style={{ "--span": group.span }}
                >
                  <h2 className="sk-h">{group.title}</h2>

                  <ul className="sk-list">
                    {group.skills.map((item) => (
                      <Skill
                        key={item.id}
                        name={item.name}
                        icon={item.icon}
                        abbr={item.abbr}
                      />
                    ))}
                  </ul>
                </section>
              ))}
          </div>
        </div>

        {/* ---------- Right: download button + quote panel ---------- */}
        <aside className="sk-side">
          <a
            className="pf-btn pf-btn-line sk-pdf"
            href={PDF}
            download
          >
            <FiDownload aria-hidden="true" />
            Download Skills PDF
          </a>

          <div
            className="sk-panel"
            style={{
              backgroundImage: `url(${PANEL_IMAGE}), linear-gradient(180deg, #0f1218 0%, #1a2030 60%, #2b3345 100%)`,
            }}
          >
            <FiTerminal
              className="sk-term"
              aria-hidden="true"
            />

            <blockquote className="sk-quote">
              &ldquo; {QUOTE} &rdquo;
            </blockquote>
          </div>
        </aside>
      </div>
    </section>
  );
}

