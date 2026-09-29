import { useState } from "react";
import "./NotFound.css";

const ASTRONAUT = "/astronaut.png"; // optional transparent PNG in the "public" folder

export default function NotFound({ onNavigate }) {
  const [imageOk, setImageOk] = useState(true);

  return (
    <section className="nf">
      <div className="nf-moon" aria-hidden="true" />

      {imageOk && (
        <img className="nf-astro" src={ASTRONAUT} alt="" onError={() => setImageOk(false)} />
      )}

      <div className="nf-copy">
        <h1 className="nf-code">404</h1>
        <p className="nf-title">Looks like you&apos;ve gone off track.</p>
        <p className="nf-text">The page you&apos;re looking for doesn&apos;t exist.</p>
        <button type="button" className="pf-btn pf-btn-dark nf-btn" onClick={() => onNavigate("home")}>
          Go Home
        </button>
      </div>
    </section>
  );
}