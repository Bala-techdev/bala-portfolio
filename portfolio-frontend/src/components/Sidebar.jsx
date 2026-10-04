import { useState } from "react";
import {
  FiHome,
  FiUser,
  FiBookOpen,
  FiFolder,
  FiTarget,
  FiBarChart2,
  FiAward,
  FiFile,
  FiFileText,
  FiMessageCircle,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiSettings,
} from "react-icons/fi";

/* EDIT YOUR LINKS HERE */
const LINKS = {
  github: "https://github.com/bala-techdev",
  linkedin:
    "https://www.linkedin.com/in/bala-s-160562370?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  email: "mailto:bala.selvarasu.dev@gmail.com",
};

const NAV = [
  { id: "home", label: "Home", icon: FiHome },
  { id: "about", label: "About", icon: FiUser },
  { id: "education", label: "Education", icon: FiBookOpen },
  { id: "projects", label: "Projects", icon: FiFolder },
  { id: "experience", label: "Experience", icon: FiTarget },
  { id: "skills", label: "Skills", icon: FiBarChart2 },
  { id: "certificates", label: "Certificates", icon: FiAward },
  { id: "resume", label: "Resume", icon: FiFile },
  { id: "blog", label: "Blog", icon: FiFileText },
  { id: "contact", label: "Contact", icon: FiMessageCircle },
];

export default function Sidebar({ active, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileOpen((open) => !open);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const openAdmin = () => {
    setMobileOpen(false);
    window.location.hash = "/admin";
  };

  const navigate = (id) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <aside
      className={`pf-sidebar ${
        mobileOpen ? "pf-sidebar-mobile-open" : ""
      }`}
    >
      {/* Top / Logo / Navigation */}
      <div className="pf-side-top">
        <button
          type="button"
          className="pf-logo"
          aria-label={
            mobileOpen
              ? "Close extra navigation"
              : "Open extra navigation"
          }
          aria-expanded={mobileOpen}
          onClick={toggleMobileMenu}
        >
          B
        </button>

        <nav
          className="pf-navigation"
          aria-label="Primary navigation"
        >
          <ul className="pf-nav">
            {NAV.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  type="button"
                  className="pf-link"
                  aria-label={label}
                  aria-current={
                    active === id ? "page" : undefined
                  }
                  onClick={() => navigate(id)}
                >
                  <Icon aria-hidden="true" />

                  <span className="pf-link-text">
                    {label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Extra Mobile/Desktop Options */}
      <div className="pf-side-foot">
        {/* Social Links */}
        <div className="pf-socials">
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FiGithub aria-hidden="true" />
          </a>

          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin aria-hidden="true" />
          </a>

          <a
            href={LINKS.email}
            aria-label="Email"
          >
            <FiMail aria-hidden="true" />
          </a>
        </div>

        {/* Admin */}
        <button
          type="button"
          className="pf-link pf-admin-link"
          onClick={openAdmin}
          aria-label="Admin Login"
        >
          <FiSettings aria-hidden="true" />

          <span className="pf-link-text">
            Admin
          </span>
        </button>

        {/* Let's Talk */}
        <button
          type="button"
          className="pf-btn pf-btn-dark pf-talk"
          onClick={() => navigate("contact")}
        >
          Let&apos;s Talk
        </button>
      </div>
    </aside>
  );
}