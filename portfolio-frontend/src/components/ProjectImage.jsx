import { useState } from "react";
import { FiHeart, FiShield, FiEdit3, FiCode } from "react-icons/fi";
import "./ProjectImage.css";

const ICONS = { heart: FiHeart, shield: FiShield, edit: FiEdit3 };

export default function ProjectImage({ src, alt, accent, icon }) {
  const [failed, setFailed] = useState(false);
  const Icon = ICONS[icon] || FiCode;

  if (!src || failed) {
    return (
      <div className="pi pi-fallback" style={{ background: accent }} role="img" aria-label={alt}>
        <Icon aria-hidden="true" />
        <span className="pi-lines" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
    );
  }

  return (
    <img className="pi" src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
  );
}