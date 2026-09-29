// import { NavLink } from "react-router-dom";
// import { navigation, profile } from "../data/profile";

// export default function Sidebar() {
//   return (
//     <aside className="sidebar">
//       <NavLink className="brand" to="/" aria-label="Bala S home">
//         B
//       </NavLink>

//       <nav aria-label="Primary navigation">
//         {navigation.map(([to, icon, label]) => (
//           <NavLink
//             key={to}
//             className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
//             to={to}
//             end={to === "/"}
//           >
//             <span aria-hidden="true">{icon}</span>
//             {label}
//           </NavLink>
//         ))}
//       </nav>

//       <div className="side-bottom">
//         <div className="socials">
//           <a href={profile.socials.github} aria-label="GitHub">
//             ◉
//           </a>
//           <a href={profile.socials.linkedin} aria-label="LinkedIn">
//             in
//           </a>
//           <a href={profile.socials.email} aria-label="Email">
//             ✉
//           </a>
//         </div>
        
//         <NavLink className="talk" to="/contact">
//           Let&apos;s Talk
//         </NavLink>
//       </div>
//     </aside>
//   );
// }

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
} from "react-icons/fi";

/* EDIT YOUR LINKS HERE */
const LINKS = {
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-username",
  email: "mailto:you@example.com",
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
                  aria-current={active === id ? "page" : undefined}
                  onClick={() => onNavigate(id)}
                >
                  <Icon aria-hidden="true" />
                  <span className="pf-link-text">{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="pf-side-foot">
        <div className="pf-socials">
          <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FiGithub />
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <a href={LINKS.email} aria-label="Email">
            <FiMail />
          </a>
        </div>
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