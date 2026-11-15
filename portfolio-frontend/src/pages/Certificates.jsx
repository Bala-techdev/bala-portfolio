import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { FiExternalLink } from "react-icons/fi";
import "./Certificates.css";

function Badge({ cert }) {
  const [failed, setFailed] = useState(!cert.logoUrl);

  return (
    <span
      className="ce-badge"
      style={{
        background: cert.bgColor,
        color: cert.fgColor,
      }}
    >
      {failed ? (
        <b aria-hidden="true">{cert.abbr}</b>
      ) : (
        <img
          src={cert.logoUrl}
          alt={`${cert.issuer} logo`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}

export default function Certificates() {
  const { portfolio } = usePortfolio();

  const certificates = portfolio.certificates;

  return (
    <section className="ce">
      <h1 className="ce-title">Certificates</h1>

      <p className="ce-sub">
        Courses and certifications I have completed.
      </p>

      <ul className="ce-list">
          {certificates.map((cert) => (
            <li key={cert.id}>
              {cert.url ? (
                <a
                  className="ce-row"
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${cert.title} by ${cert.issuer} (opens in a new tab)`}
                >
                  <Badge cert={cert} />

                  <span className="ce-text">
                    <strong>{cert.title}</strong>
                    <small>{cert.issuer}</small>
                  </span>

                  <FiExternalLink
                    className="ce-open"
                    aria-hidden="true"
                  />
                </a>
              ) : (
                <div
                  className="ce-row ce-row-unverified"
                  aria-label={`${cert.title} by ${cert.issuer}; verification link pending`}
                >
                <Badge cert={cert} />

                <span className="ce-text">
                  <strong>{cert.title}</strong>
                  <small>{cert.issuer} · Verification link pending</small>
                </span>
                </div>
              )}
            </li>
          ))}
      </ul>
    </section>
  );
}