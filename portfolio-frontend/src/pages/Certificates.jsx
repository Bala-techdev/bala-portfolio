import { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { certificates } from "../data/certificates";
import "./Certificates.css";

function Badge({ cert }) {
  const [failed, setFailed] = useState(!cert.logo);

  return (
    <span className="ce-badge" style={{ background: cert.bg, color: cert.fg }}>
      {failed ? (
        <b aria-hidden="true">{cert.abbr}</b>
      ) : (
        <img src={cert.logo} alt="" onError={() => setFailed(true)} />
      )}
    </span>
  );
}

export default function Certificates() {
  return (
    <section className="ce">
      <h1 className="ce-title">Certificates</h1>
      <p className="ce-sub">Courses and certifications I have completed.</p>

      <ul className="ce-list">
        {certificates.map((cert) => (
          <li key={cert.id}>
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
              <FiExternalLink className="ce-open" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}