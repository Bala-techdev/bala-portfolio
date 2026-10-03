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
  linkedin: "https://www.linkedin.com/in/bala-s-160562370?utm_source=share_via&utm_content=profile&utm_medium=member_android",
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
  const openAdmin = () => {
    window.location.hash = "/admin";
  };

  return (
    <aside className="pf-sidebar">
      <div className="pf-side-top">
        <button
          type="button"
          className="pf-logo"
          aria-label="Home"
          onClick={() => onNavigate("home")}
        >
          B
        </button>

        <nav aria-label="Primary">
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
                  onClick={() => onNavigate(id)}
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

      <div className="pf-side-foot">
        <div className="pf-socials">
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FiGithub />
          </a>

          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>

          <a
            href={LINKS.email}
            aria-label="Email"
          >
            <FiMail />
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

        <button
          type="button"
          className="pf-btn pf-btn-dark pf-talk"
          onClick={() => onNavigate("contact")}
        >
          Let&apos;s Talk
        </button>
      </div>
    </aside>
  );
}