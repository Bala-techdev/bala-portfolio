import { useEffect, useState } from "react";
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
          alt=""
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/v1/certificates")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        setCertificates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load certificates:", err);
        setError("Unable to load certificates.");
        setLoading(false);
      });
  }, []);

  return (
    <section className="ce">
      <h1 className="ce-title">Certificates</h1>

      <p className="ce-sub">
        Courses and certifications I have completed.
      </p>

      {loading && (
        <p>Loading certificates...</p>
      )}

      {error && (
        <p>{error}</p>
      )}

      {!loading && !error && (
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

                <FiExternalLink
                  className="ce-open"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}