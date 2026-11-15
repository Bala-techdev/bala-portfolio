import { useState } from "react";
import {
  FiArrowRight,
  FiDownload,
  FiGithub,
  FiImage,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";
import { usePortfolio } from "../context/PortfolioContext";

const PHOTO = "/profile.png"; // put your image in the "public" folder
const RESUME = "/resume.pdf"; // put your resume in the "public" folder

export default function Home({ onNavigate }) {
  const { portfolio } = usePortfolio();
  const { profile } = portfolio;

  const [photoOk, setPhotoOk] = useState(true);

  return (
    <>
      <section className="pf-hero">
        <div className="pf-copy">
          <p className="pf-status">
            <span className="pf-dot" aria-hidden="true" />
            Available for opportunities
          </p>

          <h1 className="pf-title">
            <span className="pf-hi">Hello, I&apos;m</span>
            <span className="pf-name">{profile.name.toUpperCase()}</span>
          </h1>

          <p className="pf-role">{profile.role}</p>

          <p className="pf-bio">
            {profile.bio}
          </p>

          <div className="pf-actions">
            <button
              type="button"
              className="pf-btn pf-btn-dark"
              onClick={() => onNavigate("projects")}
            >
              View Projects <FiArrowRight aria-hidden="true" />
            </button>

            <a
              className="pf-btn pf-btn-line"
              href={RESUME}
              download
            >
              Download Resume <FiDownload aria-hidden="true" />
            </a>

            <button
              type="button"
              className="pf-btn pf-btn-line"
              onClick={() => onNavigate("contact")}
            >
              Contact Me <FiMail aria-hidden="true" />
            </button>
          </div>

          <div className="pf-hero-socials" aria-label="Social links">
            <a href={profile.socials.github} target="_blank" rel="noreferrer">
              <FiGithub aria-hidden="true" /> GitHub
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
              <FiLinkedin aria-hidden="true" /> LinkedIn
            </a>
            <a href={profile.socials.email}>
              <FiMail aria-hidden="true" /> Email
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
              alt={`Portrait of ${profile.name}`}
              decoding="async"
              fetchPriority="high"
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

      <section className="pf-stats" aria-label="Engineering focus">
        {["Java & Spring Boot", "React.js", "Secure Applications", "AI Exploration"].map(
          (focus) => (
            <div className="pf-stat" key={focus}>
              <span className="pf-label">{focus}</span>
            </div>
          )
        )}
      </section>
    </>
  );
}