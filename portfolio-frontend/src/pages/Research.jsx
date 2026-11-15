import { FiExternalLink } from "react-icons/fi";
import { usePortfolio } from "../context/PortfolioContext";
import "./Research.css";

function formatDate(value) {
  if (!value) return "Date pending verification";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
}

export default function Research() {
  const { portfolio } = usePortfolio();
  const publications = portfolio.research ?? portfolio.publications ?? [];

  return (
    <section className="rs">
      <header className="rs-header">
        <p className="rs-kicker">Research &amp; Publications</p>
        <h1 className="rs-title">Research and technical writing</h1>
        <p className="rs-subtitle">
          A transparent record of published and in-progress technical work.
          Publication details are shown only when they are available for
          verification.
        </p>
      </header>

      <div className="rs-list">
        {publications.map((publication) => (
          <article className="rs-card" key={publication.id ?? publication.slug}>
            <div className="rs-card-top">
              <span className="rs-date">
                {formatDate(publication.publishedAt ?? publication.isoDate)}
              </span>
              <span className="rs-status">
                {publication.publicationStatus ?? "Status pending verification"}
              </span>
            </div>
            <h2>{publication.title}</h2>
            <p className="rs-authors">
              <strong>Authorship:</strong>{" "}
              {Array.isArray(publication.authors)
                ? publication.authors.join(", ")
                : publication.authors ?? "Authorship pending verification"}
            </p>
            <p className="rs-excerpt">
              {publication.excerpt ??
                "Publication summary pending verification."}
            </p>
            <p className="rs-verification">
              <strong>Verification:</strong>{" "}
              {publication.verificationDetails ??
                "No external publication record has been provided."}
            </p>
            {publication.slug && (
              <a className="rs-link" href={`/blog/${publication.slug}`}>
                Read technical article <FiExternalLink aria-hidden="true" />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
