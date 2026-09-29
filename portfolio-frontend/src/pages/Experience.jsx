import { useState } from "react";
import { experience } from "../data/experience";
import "./Experience.css";

const PHOTO = "/experience.jpg"; // put your photo in the "public" folder
const QUOTE = "Every Experience Adds a New Piece to My Story.";

function Logo({ src, initials }) {
  const [failed, setFailed] = useState(!src);

  return (
    <div className="ex-logo">
      {failed ? (
        <span aria-hidden="true">{initials}</span>
      ) : (
        <img src={src} alt="" onError={() => setFailed(true)} />
      )}
    </div>
  );
}

export default function Experience() {
  const [photoOk, setPhotoOk] = useState(true);

  return (
    <section className="ex">
      <div className="ex-grid">
        {/* ---------- Left: heading + timeline ---------- */}
        <div className="ex-main">
          <h1 className="ex-title">Experience</h1>
          <p className="ex-sub">My professional journey and internships.</p>

          <ol className="ex-timeline">
            {experience.map((item) => (
              <li className="ex-item" key={item.id}>
                <article className="ex-card">
                  <div className="ex-info">
                    <p className="ex-date">{item.period}</p>
                    <h2 className="ex-role">{item.title}</h2>
                    <ul className="ex-points">
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  <Logo src={item.logo} initials={item.initials} />
                </article>
              </li>
            ))}
          </ol>
        </div>

        {/* ---------- Right: photo + quote ---------- */}
        <aside className="ex-side">
          {photoOk ? (
            <img
              className="ex-photo"
              src={PHOTO}
              alt=""
              onError={() => setPhotoOk(false)}
            />
          ) : (
            <p className="ex-hint">Add your photo as public/experience.jpg</p>
          )}
          <blockquote className="ex-quote">&ldquo; {QUOTE} &rdquo;</blockquote>
        </aside>
      </div>
    </section>
  );
}