// import Button from "../components/Button";
// import { profile } from "../data/profile";

// export default function Home() {
//   return (
//     <section className="hero section" aria-labelledby="hero-title">
//       <div className="hero-copy">
//         <p className="availability">
//           <i />
//           Available for opportunities
//         </p>
//         <h1 id="hero-title">
//           Hi, I&apos;m <strong>{profile.name}</strong>
//         </h1>
//         <p className="role">{profile.role}</p>
//         <p className="intro">{profile.bio}</p>
//         <div className="actions">
//           <Button className="primary" to="/projects">
//             View My Work <span>→</span>
//           </Button>
//           <Button href="#resume">
//             Download Resume <span>⇩</span>
//           </Button>
//         </div>
//       </div>

//       <div className="hero-art" aria-label="Developer portrait placeholder">
//         <div className="orb" />
//         <div className="portrait">
//           <div className="hair" />
//           <div className="face" />
//           <div className="body" />
//           <div className="arm arm-one" />
//           <div className="arm arm-two" />
//         </div>
//         <p className="hand-note">
//           Better<br />
//           Code<br />
//           Brighter<br />
//           Tomorrow <span>↘</span>
//         </p>
//       </div>

//       <div className="hero-stats">
//         {profile.stats.map(([value, label]) => (
//           <div key={label}>
//             <b>{value}</b>
//             <span>{label}</span>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


import { useState } from "react";
import { FiArrowRight, FiDownload, FiImage } from "react-icons/fi";

/* EDIT YOUR DETAILS HERE */
const NAME = "Bala S";
const ROLE = "Full Stack Developer | Problem Solver | Lifelong Learner";
const BIO =
  "I build scalable web applications, explore AI, and turn ideas into real-world solutions.";
const PHOTO = "/profile.png"; // put your image in the "public" folder
const RESUME = "/resume.pdf"; // put your resume in the "public" folder

const STATS = [
  { value: "3+", label: "Years of Learning" },
  { value: "15+", label: "Projects Completed" },
  { value: "500+", label: "DSA Problems Solved" },
  { value: "∞", label: "Ideas to Build" },
];

export default function Home({ onNavigate }) {
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
            <a className="pf-btn pf-btn-line" href={RESUME} download>
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
        {STATS.map((s) => (
          <div className="pf-stat" key={s.label}>
            <span className="pf-num">{s.value}</span>
            <span className="pf-label">{s.label}</span>
          </div>
        ))}
      </section>
    </>
  );
}