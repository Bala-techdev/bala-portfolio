import { useState } from "react";
import { FiArrowRight, FiDownload, FiImage } from "react-icons/fi";
import { usePortfolio } from "../context/PortfolioContext";

/* EDIT YOUR DETAILS HERE */
const NAME = "Bala S";
const ROLE = "Full Stack Developer | Problem Solver | Lifelong Learner";
const BIO =
  "I build scalable web applications, explore AI, and turn ideas into real-world solutions.";
const PHOTO = "/profile.png"; // put your image in the "public" folder
const RESUME = "/resume.pdf"; // put your resume in the "public" folder

export default function Home({ onNavigate }) {
  const { portfolio } = usePortfolio();

  const [photoOk, setPhotoOk] = useState(true);

  const stats = [
    { value: "3+", label: "Years of Learning" },
    {
      value: `${portfolio.projects.length}+`,
      label: "Projects Completed",
    },
    { value: "500+", label: "DSA Problems Solved" },
    { value: "∞", label: "Ideas to Build" },
  ];

  return (
    <>
      <section className="pf-hero">
        <div className="pf-copy">
          <p className="pf-status">
            <span className="pf-dot" aria-hidden="true" />
            Available for opportunities
          </p>

          <h1 className="pf-title">
            <span className="pf-hi">Hi, I&apos;m</span>
            <span className="pf-name">{NAME}</span>
          </h1>

          <p className="pf-role">{ROLE}</p>

          <p className="pf-bio">{BIO}</p>

          <div className="pf-actions">
            <button
              type="button"
              className="pf-btn pf-btn-dark"
              onClick={() => onNavigate("projects")}
            >
              View My Work <FiArrowRight aria-hidden="true" />
            </button>

            <a
              className="pf-btn pf-btn-line"
              href={RESUME}
              download
            >
              Download Resume <FiDownload aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Photo area */}
        <div className="pf-visual">
          <div className="pf-circle" aria-hidden="true" />

          {photoOk ? (
            <img
              className="pf-photo"
              src={PHOTO}
              alt={`Portrait of ${NAME}`}
              onError={() => setPhotoOk(false)}
            />
          ) : (
            <div className="pf-photo pf-slot">
              <FiImage aria-hidden="true" />
              <strong>Add your photo here</strong>
              <small>Save it as public/profile.png</small>
            </div>
          )}

          <div className="pf-note" aria-hidden="true">
            <p>
              <span>Better</span>
              <span>Code</span>
              <span>Brighter</span>
              <span>Tomorrow</span>
            </p>

            <svg
              className="pf-arrow"
              viewBox="0 0 60 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 44 C 18 40, 34 30, 46 10" />
              <path d="M37.7 15.6 L46 10 L45 20" />
            </svg>
          </div>
        </div>
      </section>

      <section className="pf-stats" aria-label="Highlights">
        {stats.map((stat) => (
          <div className="pf-stat" key={stat.label}>
            <span className="pf-num">{stat.value}</span>
            <span className="pf-label">{stat.label}</span>
          </div>
        ))}
      </section>
    </>
  );
}