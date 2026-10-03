import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Education from "./pages/Education";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Experience from "./pages/Experience";
import Skills from "./pages/Skills";
import Certificates from "./pages/Certificates";
import Resume from "./pages/Resume";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";
import "./style.css";

// Simple pages: the key is the address, e.g. #/skills
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

// "#/projects/blood-donor-finder" -> { section: "projects", id: "blood-donor-finder" }
function readRoute() {
  const [section, id] = window.location.hash.replace(/^#\/?/, "").split("/");
  return { section: section || "home", id: id || null };
}

export default function App() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const onChange = () => setRoute(readRoute());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  const navigate = (to) => {
    window.location.hash = to === "home" ? "/" : `/${to}`;
  };
  const openProject = (id) => {
    window.location.hash = `/projects/${id}`;
  };
  const openPost = (id) => {
    window.location.hash = `/blog/${id}`;
  };

  const { section, id } = route;

if (section === "admin" && !id) {
  const token = localStorage.getItem("admin_token");

  window.location.hash = token
    ? "/admin/dashboard"
    : "/admin/login";

  return null;
}

if (section === "admin" && id === "login") {
  return (
    <AdminLogin
      onLogin={() => {
        window.location.hash = "/admin/dashboard";
      }}
    />
  );
}

if (section === "admin" && id === "dashboard") {
  return (
    <AdminDashboard
      onLogout={() => {
        window.location.hash = "/admin/login";
      }}
    />
  );
}

let content;
  if (section === "projects" && id) {
    content = <ProjectDetail id={id} onBack={() => navigate("projects")} />;
  } else if (section === "projects") {
    content = <Projects onOpenProject={openProject} />;
  } else if (section === "blog" && id) {
    content = <BlogPost id={id} onBack={() => navigate("blog")} />;
  } else if (section === "blog") {
    content = <Blog onOpenPost={openPost} />;
  } else if (PAGES[section]) {
    const Page = PAGES[section];
    content = <Page onNavigate={navigate} />;
  } else {
    content = <NotFound onNavigate={navigate} />;
  }

  return (
    <div className="pf-app">
      <Sidebar active={section} onNavigate={navigate} />
      <main className="pf-main">{content}</main>
    </div>
  );
}