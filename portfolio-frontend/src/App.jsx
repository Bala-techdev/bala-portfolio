import { lazy, Suspense, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import {
  PortfolioProvider,
  usePortfolio,
} from "./context/PortfolioContext";
import "./App.css";
import "./style.css";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Education = lazy(() => import("./pages/Education"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Experience = lazy(() => import("./pages/Experience"));
const Skills = lazy(() => import("./pages/Skills"));
const Certificates = lazy(() => import("./pages/Certificates"));
const Resume = lazy(() => import("./pages/Resume"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Research = lazy(() => import("./pages/Research"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const PAGES = {
  home: Home,
  about: About,
  education: Education,
  experience: Experience,
  skills: Skills,
  certificates: Certificates,
  resume: Resume,
  contact: Contact,
};

function readRoute(pathname) {
  const [section, id] = pathname.replace(/^\/+|\/+$/g, "").split("/");
  return { section: section || "home", id: id || null };
}

function SyncStatusBadge() {
  const { syncStatus, syncError } = usePortfolio();
  const isLive = syncStatus === "live";

  return (
    <div
      className={`pf-sync-badge ${
        isLive ? "pf-sync-live" : "pf-sync-cached"
      }`}
      title={syncError || undefined}
      role="status"
      aria-live="polite"
    >
      <span className="pf-sync-dot" aria-hidden="true" />
      {isLive ? "Live Synced" : "Cached View"}
    </div>
  );
}

function AdminRoute({ id, navigate }) {
  if (id === "login") {
    return (
      <AdminLogin
        onLogin={() => navigate("/admin/dashboard")}
      />
    );
  }

  if (id === "dashboard") {
    return (
      <AdminDashboard
        onLogout={() => navigate("/admin/login")}
      />
    );
  }

  return null;
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const route = readRoute(location.pathname);
  const { section, id } = route;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (section === "admin" && !id) {
      const token = localStorage.getItem("admin_token");
      navigate(
        token ? "/admin/dashboard" : "/admin/login",
        { replace: true }
      );
    }
  }, [id, navigate, section]);

  const goTo = (to) => {
    navigate(to === "home" ? "/" : `/${to}`);
  };

  const openProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const openPost = (postId) => {
    navigate(`/blog/${postId}`);
  };

  if (section === "admin") {
    return (
      <Suspense fallback={null}>
        <AdminRoute id={id} navigate={navigate} />
      </Suspense>
    );
  }

  let content;

  if (section === "projects" && id) {
    content = (
      <ProjectDetail
        id={id}
        onBack={() => goTo("projects")}
      />
    );
  } else if (section === "projects") {
    content = <Projects onOpenProject={openProject} />;
  } else if (section === "blog" && id) {
    content = (
      <BlogPost
        id={id}
        onBack={() => goTo("blog")}
      />
    );
  } else if (section === "blog") {
    content = <Blog onOpenPost={openPost} />;
  } else if (section === "research") {
    content = <Research />;
  } else if (PAGES[section]) {
    const Page = PAGES[section];
    content = <Page onNavigate={goTo} />;
  } else {
    content = <NotFound onNavigate={goTo} />;
  }

  return (
    <PortfolioProvider>
      <div className="pf-app">
        <SyncStatusBadge />
        <Sidebar active={section} onNavigate={goTo} />
        <main className="pf-main">
          <Suspense fallback={null}>{content}</Suspense>
        </main>
      </div>
    </PortfolioProvider>
  );
}
