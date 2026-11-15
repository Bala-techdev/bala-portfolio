import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import "./Education.css";

const PHOTO = "/education.jpg";
const QUOTE =
  "Education gives me the foundation, curiosity gives me the direction.";

function Crest({ src, initials, alt }) {
  const [failed, setFailed] = useState(!src);

  return (
    <div className="ed-crest">
      {failed ? (
        <span aria-hidden="true">{initials}</span>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export default function Education() {
  const { portfolio } = usePortfolio();

  const education = portfolio.education;

  const [photoOk, setPhotoOk] = useState(true);

  return (
    <section className="ed">
      <div className="ed-grid">
        <div className="ed-main">
          <h1 className="ed-title">Education</h1>
          <p className="ed-sub">My academic journey.</p>

          <ol className="ed-list">
              {education.map((item) => (
                <li className="ed-item" key={item.id}>
                  <Crest
                    src={item.logoUrl}
                    initials={item.initials}
                    alt={`${item.school} logo`}
                  />

                  <div className="ed-info">
                    <p className="ed-date">{item.period}</p>

                    <h2 className="ed-degree">
                      {item.title}
                    </h2>

                    <p className="ed-school">
                      {item.school}
                    </p>

                    {item.score && (
                      <p className="ed-score">
                        {item.score}
                      </p>
                    )}
                  </div>
                </li>
              ))}
          </ol>
        </div>

        <aside className="ed-side">
          {photoOk ? (
            <img
              className="ed-photo"
              src={PHOTO}
              alt="Bala S education and academic journey"
              loading="lazy"
              decoding="async"
              onError={() => setPhotoOk(false)}
            />
          ) : (
            <p className="ed-hint">
              Add your photo as public/education.jpg
            </p>
          )}

          <blockquote className="ed-quote">
            &ldquo; {QUOTE} &rdquo;
          </blockquote>
        </aside>
      </div>
    </section>
  );
}