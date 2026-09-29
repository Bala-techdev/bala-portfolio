import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import "./Resume.css";

/* EDIT YOUR DETAILS HERE */
const NAME = "BALA S";
const RESUME = "/resume.pdf"; // your resume PDF in the "public" folder
const PREVIEW = "/resume-preview.png"; // a screenshot of page 1 in "public"

const HIGHLIGHTS = [
  "Full Stack Developer (Java, Spring Boot, React.js)",
  "3+ Projects | 500+ DSA Problems",
  "Open for Internships and Full-time Opportunities",
  "Passionate about AI/ML and Product Development",
];

const QUOTE = "A single page, a million possibilities.";

export default function Resume() {
  const [previewOk, setPreviewOk] = useState(true);

  return (
    <section className="rs">
      <div className="rs-top">
        <div>
          <h1 className="rs-title">Resume</h1>
          <p className="rs-sub">My professional summary.</p>
        </div>

        <div className="rs-actions">
          <a className="pf-btn pf-btn-dark" href={RESUME} download>
            <FiDownload aria-hidden="true" /> Download PDF
          </a>
          <a className="pf-btn pf-btn-line" href={RESUME} target="_blank" rel="noreferrer">
            View Online
          </a>
        </div>
      </div>

      <div className="rs-grid">
        {/* ---------- Resume preview ---------- */}
        <div className="rs-paper">
          {previewOk ? (
            <img
              className="rs-img"
              src={PREVIEW}
              alt={`Preview of ${NAME}'s resume`}
              onError={() => setPreviewOk(false)}
            />
          ) : (
            <div className="rs-skeleton" aria-hidden="true">
              <div className="rs-head">
                <span className="rs-avatar" />
                <div>
                  <b>{NAME}</b>
                  <i />
                  <i />
                </div>
              </div>
              {[1, 2, 3, 4].map((n) => (
                <div className="rs-block" key={n}>
                  <span className="rs-bar" />
                  <i />
                  <i />
                  <i />
                </div>
              ))}
              <p className="rs-hint">Add a preview as public/resume-preview.png</p>
            </div>
          )}
        </div>

        {/* ---------- Quick highlights ---------- */}
        <div className="rs-side">
          <h2 className="rs-h">Quick Highlights</h2>
          <ul className="rs-list">
            {HIGHLIGHTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <blockquote className="rs-quote">&ldquo; {QUOTE} &rdquo;</blockquote>
        </div>
      </div>
    </section>
  );
}