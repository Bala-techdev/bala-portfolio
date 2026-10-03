import { useEffect, useState, useCallback } from "react";
import { apiUrl } from "../api/api";
import "./AdminDashboard.css";
const api = (path) => apiUrl(path);

const EMPTY_PROJECT = {
  slug: "",
  title: "",
  category: "",
  summary: "",
  tagline: "",
  overview: "",
  features: "",
  tech: "",
  images: "",
  accent: "",
  icon: "",
  liveUrl: "",
  githubUrl: "",
  displayOrder: 0,
};

const EMPTY_EDUCATION = {
  title: "",
  school: "",
  period: "",
  score: "",
  logoUrl: "",
  initials: "",
  displayOrder: 0,
};

const EMPTY_EXPERIENCE = {
  title: "", period: "", logoUrl: "", initials: "", displayOrder: 0, points: "",
};

const EMPTY_SKILL_GROUP = { title: "", span: 1, displayOrder: 0 };
const EMPTY_SKILL = { name: "", icon: "", abbr: "", displayOrder: 0 };
const EMPTY_CERTIFICATE = { title: "", issuer: "", url: "", logoUrl: "", abbr: "", bgColor: "", fgColor: "", displayOrder: 0 };

export default function AdminDashboard({ onLogout }) {
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [error, setError] = useState("");

  const [projectsCount, setProjectsCount] = useState(0);
  const [blogPostsCount, setBlogPostsCount] = useState(0);
  const [skillsCount, setSkillsCount] = useState(0);
  const [certificatesCount, setCertificatesCount] = useState(0);

  const [blogPosts, setBlogPosts] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);

  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState(null);
  const [blogForm, setBlogForm] = useState({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    coverUrl: "",
    accent: "",
    icon: "",
    published: false,
  });
  const [blogSaving, setBlogSaving] = useState(false);
  const [blogError, setBlogError] = useState("");

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState(EMPTY_PROJECT);
  const [projectSaving, setProjectSaving] = useState(false);
  const [projectError, setProjectError] = useState("");

  const [education, setEducation] = useState([]);
  const [educationLoading, setEducationLoading] = useState(true);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [educationForm, setEducationForm] = useState(EMPTY_EDUCATION);
  const [educationSaving, setEducationSaving] = useState(false);
  const [educationError, setEducationError] = useState("");

  const [experience, setExperience] = useState([]);
  const [experienceLoading, setExperienceLoading] = useState(true);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [experienceForm, setExperienceForm] = useState(EMPTY_EXPERIENCE);
  const [experienceSaving, setExperienceSaving] = useState(false);
  const [experienceError, setExperienceError] = useState("");

  const [skillGroups, setSkillGroups] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [showSkillGroupForm, setShowSkillGroupForm] = useState(false);
  const [editingSkillGroup, setEditingSkillGroup] = useState(null);
  const [skillGroupForm, setSkillGroupForm] = useState(EMPTY_SKILL_GROUP);
  const [skillGroupSaving, setSkillGroupSaving] = useState(false);
  const [skillGroupError, setSkillGroupError] = useState("");
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingSkillGroupId, setEditingSkillGroupId] = useState(null);
  const [skillForm, setSkillForm] = useState(EMPTY_SKILL);
  const [skillSaving, setSkillSaving] = useState(false);
  const [skillError, setSkillError] = useState("");

  const [certificates, setCertificates] = useState([]);
  const [certificatesLoading, setCertificatesLoading] = useState(true);
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [certificateForm, setCertificateForm] = useState(EMPTY_CERTIFICATE);
  const [certificateSaving, setCertificateSaving] = useState(false);
  const [certificateError, setCertificateError] = useState("");

  const handleUnauthorized = useCallback(() => {
    localStorage.removeItem("admin_token");

    if (typeof onLogout === "function") {
      onLogout();
    } else {
      window.location.hash = "/admin/login";
    }
  }, [onLogout]);

  // =========================
  // Fetch Messages
  // =========================
  const fetchMessages = useCallback(async () => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      handleUnauthorized();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(api("/api/v1/admin/contact-messages"),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setMessages(data);
      } else if (Array.isArray(data.content)) {
        setMessages(data.content);
      } else {
        setMessages([]);
      }
    } catch (err) {
      console.error("Failed to load messages:", err);
      setError("Unable to load contact messages.");
    } finally {
      setLoading(false);
    }
  }, [handleUnauthorized]);

  // =========================
  // Fetch Dashboard Stats
  // =========================
  const fetchDashboardStats = useCallback(async () => {
    try {
      const [
        projectsResponse,
        blogResponse,
        skillsResponse,
        certificatesResponse,
      ] = await Promise.all([
        fetch(api("/api/v1/projects")),
        fetch(api("/api/v1/blog")),
        fetch(api("/api/v1/skills")),
        fetch(api("/api/v1/certificates")),
      ]);

      if (
        !projectsResponse.ok ||
        !blogResponse.ok ||
        !skillsResponse.ok ||
        !certificatesResponse.ok
      ) {
        throw new Error(
          "Failed to load dashboard statistics"
        );
      }

      const projectsData =
        await projectsResponse.json();

      const blogData =
        await blogResponse.json();

      const skillsData =
        await skillsResponse.json();

      const certificatesData =
        await certificatesResponse.json();

      setProjectsCount(
        Array.isArray(projectsData)
          ? projectsData.length
          : 0
      );

      setBlogPostsCount(
        Array.isArray(blogData.content)
          ? blogData.content.length
          : 0
      );

      const totalSkills = Array.isArray(skillsData)
        ? skillsData.reduce(
            (total, group) =>
              total +
              (Array.isArray(group.skills)
                ? group.skills.length
                : 0),
            0
          )
        : 0;

      setSkillsCount(totalSkills);
      setCertificatesCount(Array.isArray(certificatesData) ? certificatesData.length : 0);
    } catch (err) {
      console.error(
        "Failed to load dashboard stats:",
        err
      );
    }
  }, []);

  // =========================
  // Fetch Projects
  // =========================
  const fetchProjects = useCallback(async () => {
    try {
      setProjectsLoading(true);

      const response = await fetch(api("/api/v1/projects"));

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      setProjects(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(
        "Failed to load projects:",
        err
      );
    } finally {
      setProjectsLoading(false);
    }
  }, []);

  const fetchBlogPosts = useCallback(async () => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      handleUnauthorized();
      return;
    }

    try {
      setBlogLoading(true);

      const response = await fetch(api("/api/v1/admin/blog?page=0&size=50"),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      setBlogPosts(
        Array.isArray(data)
          ? data
          : Array.isArray(data.content)
          ? data.content
          : []
      );
    } catch (err) {
      console.error("Failed to load blog posts:", err);
    } finally {
      setBlogLoading(false);
    }
  }, [handleUnauthorized]);

  // =========================
  // Fetch Education
  // =========================
  const fetchEducation = useCallback(async () => {
    try {
      setEducationLoading(true);

      const response = await fetch(api("/api/v1/education"));

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setEducation(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load education:", err);
      setEducation([]);
    } finally {
      setEducationLoading(false);
    }
  }, []);

  // =========================
  // Fetch Experience
  // =========================
  const fetchExperience = useCallback(async () => {
    try {
      setExperienceLoading(true);

      const response = await fetch(api("/api/v1/experience"));

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setExperience(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load experience:", err);
      setExperience([]);
    } finally {
      setExperienceLoading(false);
    }
  }, []);

  const fetchSkills = useCallback(async () => {
    try { setSkillsLoading(true); const r = await fetch(api("/api/v1/skills")); if (!r.ok) throw new Error(`HTTP ${r.status}`); const d = await r.json(); setSkillGroups(Array.isArray(d) ? d : []); }
    catch (e) { console.error("Failed to load skills:", e); setSkillGroups([]); }
    finally { setSkillsLoading(false); }
  }, []);

  const fetchCertificates = useCallback(async () => {
    try { setCertificatesLoading(true); const r = await fetch(api("/api/v1/certificates")); if (!r.ok) throw new Error(`HTTP ${r.status}`); const d = await r.json(); setCertificates(Array.isArray(d) ? d : []); }
    catch (e) { console.error("Failed to load certificates:", e); setCertificates([]); }
    finally { setCertificatesLoading(false); }
  }, []);

  // =========================
  // Initial Load
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      handleUnauthorized();
      return;
    }

    fetchMessages();
    fetchDashboardStats();
    fetchProjects();
    fetchBlogPosts();
    fetchEducation();
    fetchExperience();
    fetchSkills();
    fetchCertificates();
  }, [
    fetchMessages,
    fetchDashboardStats,
    fetchProjects,
    fetchBlogPosts,
    fetchEducation,
    fetchExperience,
    fetchSkills,
    fetchCertificates,
    handleUnauthorized,
  ]);

  // =========================
  // Project Form Helpers
  // =========================
  const openCreateProject = () => {
    setEditingProject(null);
    setProjectForm(EMPTY_PROJECT);
    setProjectError("");
    setShowProjectForm(true);
  };

  const openEditProject = (project) => {
    setEditingProject(project);

    setProjectForm({
      slug: project.slug || "",
      title: project.title || "",
      category: project.category || "",
      summary: project.summary || "",
      tagline: project.tagline || "",
      overview: project.overview || "",
      features: Array.isArray(project.features)
        ? project.features.join("\n")
        : "",
      tech: Array.isArray(project.tech)
        ? project.tech.join(", ")
        : "",
      images: Array.isArray(project.images)
        ? project.images.join("\n")
        : "",
      accent: project.accent || "",
      icon: project.icon || "",
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      displayOrder: project.displayOrder ?? 0,
    });

    setProjectError("");
    setShowProjectForm(true);
  };

  const closeProjectForm = () => {
    if (projectSaving) return;

    setShowProjectForm(false);
    setEditingProject(null);
    setProjectForm(EMPTY_PROJECT);
    setProjectError("");
  };

  const handleProjectChange = (event) => {
    const { name, value } = event.target;

    setProjectForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // =========================
  // Create / Update Project
  // =========================
  const saveProject = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("admin_token");

    if (!token) {
      handleUnauthorized();
      return;
    }

    setProjectSaving(true);
    setProjectError("");

    const payload = {
      slug: projectForm.slug.trim() || null,
      title: projectForm.title.trim(),
      category: projectForm.category.trim(),
      summary: projectForm.summary.trim(),
      tagline: projectForm.tagline.trim() || null,
      overview: projectForm.overview.trim() || null,
      features: projectForm.features
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      tech: projectForm.tech
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      images: projectForm.images
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      accent: projectForm.accent.trim() || null,
      icon: projectForm.icon.trim() || null,
      liveUrl: projectForm.liveUrl.trim() || null,
      githubUrl: projectForm.githubUrl.trim() || null,
      displayOrder: Number(projectForm.displayOrder) || 0,
    };

    try {
      const url = editingProject
  ? api(`/api/v1/admin/projects/${editingProject.id}`)
  : api("/api/v1/admin/projects");

      const method = editingProject ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        const validationMessage =
          data?.message || data?.error || "Unable to save project.";

        throw new Error(validationMessage);
      }

      await fetchProjects();
      await fetchDashboardStats();

      closeProjectForm();
    } catch (err) {
      console.error("Failed to save project:", err);
      setProjectError(err.message || "Unable to save project.");
    } finally {
      setProjectSaving(false);
    }
  };

  // =========================
  // Delete Project
  // =========================
  const deleteProject = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    const token = localStorage.getItem("admin_token");

    if (!token) {
      handleUnauthorized();
      return;
    }

    try {
      const response = await fetch(api(`/api/v1/admin/projects/${id}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      await fetchProjects();
      await fetchDashboardStats();
    } catch (err) {
      console.error("Failed to delete project:", err);
      alert("Unable to delete project.");
    }
  };

  const openCreateBlog = () => {
    setEditingBlogPost(null);

    setBlogForm({
      slug: "",
      title: "",
      excerpt: "",
      content: "",
      coverUrl: "",
      accent: "",
      icon: "",
      published: false,
    });

    setBlogError("");
    setShowBlogForm(true);
  };

  const openEditBlog = async (post) => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      handleUnauthorized();
      return;
    }

    try {
      const response = await fetch(api(`/api/v1/admin/blog/${post.id}`), {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      setEditingBlogPost(data);

      setBlogForm({
        slug: data.slug || "",
        title: data.title || "",
        excerpt: data.excerpt || "",
        content: data.content || "",
        coverUrl: data.coverUrl || "",
        accent: data.accent || "",
        icon: data.icon || "",
        published: Boolean(data.published),
      });

      setBlogError("");
      setShowBlogForm(true);
    } catch (err) {
      console.error("Failed to load blog post:", err);
      alert("Unable to load blog post.");
    }
  };

  const closeBlogForm = () => {
    if (blogSaving) return;

    setShowBlogForm(false);
    setEditingBlogPost(null);
    setBlogError("");
  };

  const handleBlogChange = (event) => {
    const { name, value, type, checked } = event.target;

    setBlogForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveBlogPost = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("admin_token");

    if (!token) {
      handleUnauthorized();
      return;
    }

    setBlogSaving(true);
    setBlogError("");

    const payload = {
      slug: blogForm.slug.trim() || null,
      title: blogForm.title.trim(),
      excerpt: blogForm.excerpt.trim(),
      content: blogForm.content.trim(),
      coverUrl: blogForm.coverUrl.trim() || null,
      accent: blogForm.accent.trim() || null,
      icon: blogForm.icon.trim() || null,
      published: blogForm.published,
    };

    try {
      const url = editingBlogPost
  ? api(`/api/v1/admin/blog/${editingBlogPost.id}`)
  : api("/api/v1/admin/blog");

      const method = editingBlogPost ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || data?.error || "Unable to save blog post."
        );
      }

      await fetchBlogPosts();
      await fetchDashboardStats();

      closeBlogForm();
    } catch (err) {
      console.error("Failed to save blog post:", err);
      setBlogError(err.message || "Unable to save blog post.");
    } finally {
      setBlogSaving(false);
    }
  };

  const deleteBlogPost = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog post?"
    );

    if (!confirmed) return;

    const token = localStorage.getItem("admin_token");

    if (!token) {
      handleUnauthorized();
      return;
    }

    try {
      const response = await fetch(api(`/api/v1/admin/blog/${id}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      await fetchBlogPosts();
      await fetchDashboardStats();
    } catch (err) {
      console.error("Failed to delete blog post:", err);
      alert("Unable to delete blog post.");
    }
  };

  // =========================
  // Mark Message Read / Unread
  // =========================
  const setMessageReadStatus = async (id, read) => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      handleUnauthorized();
      return;
    }

    try {
      const response = await fetch(api(`/api/v1/admin/contact-messages/${id}/read`),
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ read }),
        }
      );

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      let updatedMessage = null;

      try {
        updatedMessage = await response.json();
      } catch {
        updatedMessage = null;
      }

      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === id
            ? updatedMessage && updatedMessage.id
              ? updatedMessage
              : {
                  ...message,
                  read,
                }
            : message
        )
      );
    } catch (err) {
      console.error("Failed to update message:", err);
      alert("Unable to update message.");
    }
  };

  // =========================
  // Delete Message
  // =========================
  const deleteMessage = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    const token = localStorage.getItem("admin_token");

    if (!token) {
      handleUnauthorized();
      return;
    }

    try {
      const response = await fetch(api(`/api/v1/admin/contact-messages/${id}`),
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setMessages((currentMessages) =>
        currentMessages.filter((message) => message.id !== id)
      );
    } catch (err) {
      console.error("Failed to delete message:", err);
      alert("Unable to delete message.");
    }
  };

  // =========================
  // Education Form Helpers
  // =========================
  const openCreateEducation = () => {
    setEditingEducation(null);
    setEducationForm(EMPTY_EDUCATION);
    setEducationError("");
    setShowEducationForm(true);
  };

  const openEditEducation = (item) => {
    setEditingEducation(item);
    setEducationForm({
      title: item.title || "",
      school: item.school || "",
      period: item.period || "",
      score: item.score || "",
      logoUrl: item.logoUrl || "",
      initials: item.initials || "",
      displayOrder: item.displayOrder ?? 0,
    });
    setEducationError("");
    setShowEducationForm(true);
  };

  const closeEducationForm = () => {
    if (educationSaving) return;
    setShowEducationForm(false);
    setEditingEducation(null);
    setEducationForm(EMPTY_EDUCATION);
    setEducationError("");
  };

  const handleEducationChange = (event) => {
    const { name, value } = event.target;
    setEducationForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const saveEducation = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("admin_token");

    if (!token) {
      handleUnauthorized();
      return;
    }

    setEducationSaving(true);
    setEducationError("");

    const payload = {
      title: educationForm.title.trim(),
      school: educationForm.school.trim(),
      period: educationForm.period.trim(),
      score: educationForm.score.trim() || null,
      logoUrl: educationForm.logoUrl.trim() || null,
      initials: educationForm.initials.trim() || null,
      displayOrder: Number(educationForm.displayOrder) || 0,
    };

    try {
      const url = editingEducation
  ? api(`/api/v1/admin/education/${editingEducation.id}`)
  : api("/api/v1/admin/education");

      const method = editingEducation ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.message || data?.error || "Unable to save education."
        );
      }

      await fetchEducation();
      closeEducationForm();
    } catch (err) {
      console.error("Failed to save education:", err);
      setEducationError(err.message || "Unable to save education.");
    } finally {
      setEducationSaving(false);
    }
  };

  const deleteEducation = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this education entry?"
    );

    if (!confirmed) return;

    const token = localStorage.getItem("admin_token");

    if (!token) {
      handleUnauthorized();
      return;
    }

    try {
      const response = await fetch(api(`/api/v1/admin/education/${id}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      await fetchEducation();
    } catch (err) {
      console.error("Failed to delete education:", err);
      alert("Unable to delete education entry.");
    }
  };

  // =========================
  // Experience Form Helpers
  // =========================
  const openCreateExperience = () => {
    setEditingExperience(null);
    setExperienceForm(EMPTY_EXPERIENCE);
    setExperienceError("");
    setShowExperienceForm(true);
  };

  const openEditExperience = (item) => {
    setEditingExperience(item);
    setExperienceForm({
      title: item.title || "",
      period: item.period || "",
      logoUrl: item.logoUrl || "",
      initials: item.initials || "",
      displayOrder: item.displayOrder ?? 0,
      points: Array.isArray(item.points) ? item.points.join("\n") : "",
    });
    setExperienceError("");
    setShowExperienceForm(true);
  };

  const closeExperienceForm = () => {
    if (experienceSaving) return;
    setShowExperienceForm(false);
    setEditingExperience(null);
    setExperienceForm(EMPTY_EXPERIENCE);
    setExperienceError("");
  };

  const handleExperienceChange = (event) => {
    const { name, value } = event.target;
    setExperienceForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const saveExperience = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("admin_token");

    if (!token) {
      handleUnauthorized();
      return;
    }

    setExperienceSaving(true);
    setExperienceError("");

    const points = experienceForm.points
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (points.length === 0) {
      setExperienceError("At least one experience point is required.");
      setExperienceSaving(false);
      return;
    }

    const payload = {
      title: experienceForm.title.trim(),
      period: experienceForm.period.trim(),
      logoUrl: experienceForm.logoUrl.trim() || null,
      initials: experienceForm.initials.trim() || null,
      displayOrder: Number(experienceForm.displayOrder) || 0,
      points,
    };

    try {
     const url = editingExperience
  ? api(`/api/v1/admin/experience/${editingExperience.id}`)
  : api("/api/v1/admin/experience");

      const method = editingExperience ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.message || data?.error || "Unable to save experience."
        );
      }

      await fetchExperience();
      closeExperienceForm();
    } catch (err) {
      console.error("Failed to save experience:", err);
      setExperienceError(err.message || "Unable to save experience.");
    } finally {
      setExperienceSaving(false);
    }
  };

  const deleteExperience = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this experience entry?"
    );

    if (!confirmed) return;

    const token = localStorage.getItem("admin_token");

    if (!token) {
      handleUnauthorized();
      return;
    }

    try {
      const response = await fetch(api(`/api/v1/admin/experience/${id}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      await fetchExperience();
    } catch (err) {
      console.error("Failed to delete experience:", err);
      alert("Unable to delete experience entry.");
    }
  };

  // =========================
  // Skills CRUD
  // =========================
  const openCreateSkillGroup = () => { setEditingSkillGroup(null); setSkillGroupForm(EMPTY_SKILL_GROUP); setSkillGroupError(""); setShowSkillGroupForm(true); };
  const openEditSkillGroup = (g) => { setEditingSkillGroup(g); setSkillGroupForm({ title:g.title||"", span:g.span??1, displayOrder:g.displayOrder??0 }); setSkillGroupError(""); setShowSkillGroupForm(true); };
  const closeSkillGroupForm = () => { if(skillGroupSaving)return; setShowSkillGroupForm(false); setEditingSkillGroup(null); setSkillGroupForm(EMPTY_SKILL_GROUP); setSkillGroupError(""); };
  const handleSkillGroupChange = (e) => { const {name,value}=e.target; setSkillGroupForm(c=>({...c,[name]:value})); };
  const saveSkillGroup = async (e) => {
    e.preventDefault(); const token=localStorage.getItem("admin_token"); if(!token){handleUnauthorized();return;} setSkillGroupSaving(true); setSkillGroupError("");
    try { const r=await fetch(editingSkillGroup?api(`/api/v1/admin/skill-groups/${editingSkillGroup.id}`):api("/api/v1/admin/skill-groups"),{method:editingSkillGroup?"PUT":"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({title:skillGroupForm.title.trim(),span:Number(skillGroupForm.span)||1,displayOrder:Number(skillGroupForm.displayOrder)||0})}); if(r.status===401||r.status===403){handleUnauthorized();return;} const d=await r.json().catch(()=>({})); if(!r.ok)throw new Error(d?.message||d?.error||"Unable to save skill group."); await fetchSkills(); closeSkillGroupForm(); } catch(e){console.error(e);setSkillGroupError(e.message||"Unable to save skill group.");} finally{setSkillGroupSaving(false);}
  };
  const deleteSkillGroup = async (id) => { if(!window.confirm("Deleting this skill group will also delete its skills. Continue?"))return; const token=localStorage.getItem("admin_token"); if(!token){handleUnauthorized();return;} try{const r=await fetch(api(`/api/v1/admin/skill-groups/${id}`),{method:"DELETE",headers:{Authorization:`Bearer ${token}`}});if(r.status===401||r.status===403){handleUnauthorized();return;}if(!r.ok)throw new Error(`HTTP ${r.status}`);await fetchSkills();await fetchDashboardStats();}catch(e){console.error(e);alert("Unable to delete skill group.");} };

  const openCreateSkill = (groupId) => { setEditingSkill(null); setEditingSkillGroupId(groupId); setSkillForm(EMPTY_SKILL); setSkillError(""); setShowSkillForm(true); };
  const openEditSkill = (skill,groupId) => { setEditingSkill(skill); setEditingSkillGroupId(groupId); setSkillForm({name:skill.name||"",icon:skill.icon||"",abbr:skill.abbr||"",displayOrder:skill.displayOrder??0}); setSkillError(""); setShowSkillForm(true); };
  const closeSkillForm = () => { if(skillSaving)return; setShowSkillForm(false); setEditingSkill(null); setEditingSkillGroupId(null); setSkillForm(EMPTY_SKILL); setSkillError(""); };
  const handleSkillChange = (e) => { const {name,value}=e.target; setSkillForm(c=>({...c,[name]:value})); };
  const saveSkill = async (e) => {
    e.preventDefault(); const token=localStorage.getItem("admin_token"); if(!token){handleUnauthorized();return;} setSkillSaving(true);setSkillError("");
    try { const r=await fetch(editingSkill?api(`/api/v1/admin/skills/${editingSkill.id}`):api(`/api/v1/admin/skill-groups/${editingSkillGroupId}/skills`),{method:editingSkill?"PUT":"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({name:skillForm.name.trim(),icon:skillForm.icon.trim()||null,abbr:skillForm.abbr.trim()||null,displayOrder:Number(skillForm.displayOrder)||0})});if(r.status===401||r.status===403){handleUnauthorized();return;}const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d?.message||d?.error||"Unable to save skill.");await fetchSkills();await fetchDashboardStats();closeSkillForm();}catch(e){console.error(e);setSkillError(e.message||"Unable to save skill.");}finally{setSkillSaving(false);}
  };
  const deleteSkill = async (id) => { if(!window.confirm("Are you sure you want to delete this skill?"))return;const token=localStorage.getItem("admin_token");if(!token){handleUnauthorized();return;}try{const r=await fetch(api(`/api/v1/admin/skills/${id}`),{method:"DELETE",headers:{Authorization:`Bearer ${token}`}});if(r.status===401||r.status===403){handleUnauthorized();return;}if(!r.ok)throw new Error(`HTTP ${r.status}`);await fetchSkills();await fetchDashboardStats();}catch(e){console.error(e);alert("Unable to delete skill.");} };

  // =========================
  // Certificates CRUD
  // =========================
  const openCreateCertificate = () => { setEditingCertificate(null);setCertificateForm(EMPTY_CERTIFICATE);setCertificateError("");setShowCertificateForm(true); };
  const openEditCertificate = (c) => { setEditingCertificate(c);setCertificateForm({title:c.title||"",issuer:c.issuer||"",url:c.url||"",logoUrl:c.logoUrl||"",abbr:c.abbr||"",bgColor:c.bgColor||"",fgColor:c.fgColor||"",displayOrder:c.displayOrder??0});setCertificateError("");setShowCertificateForm(true); };
  const closeCertificateForm = () => { if(certificateSaving)return;setShowCertificateForm(false);setEditingCertificate(null);setCertificateForm(EMPTY_CERTIFICATE);setCertificateError(""); };
  const handleCertificateChange = (e) => { const {name,value}=e.target;setCertificateForm(c=>({...c,[name]:value})); };
  const saveCertificate = async (e) => {
    e.preventDefault();const token=localStorage.getItem("admin_token");if(!token){handleUnauthorized();return;}setCertificateSaving(true);setCertificateError("");
    try{const r=await fetch(editingCertificate?api(`/api/v1/admin/certificates/${editingCertificate.id}`):api("/api/v1/admin/certificates"),{method:editingCertificate?"PUT":"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({title:certificateForm.title.trim(),issuer:certificateForm.issuer.trim(),url:certificateForm.url.trim(),logoUrl:certificateForm.logoUrl.trim()||null,abbr:certificateForm.abbr.trim()||null,bgColor:certificateForm.bgColor.trim()||null,fgColor:certificateForm.fgColor.trim()||null,displayOrder:Number(certificateForm.displayOrder)||0})});if(r.status===401||r.status===403){handleUnauthorized();return;}const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d?.message||d?.error||"Unable to save certificate.");await fetchCertificates();closeCertificateForm();}catch(e){console.error(e);setCertificateError(e.message||"Unable to save certificate.");}finally{setCertificateSaving(false);}
  };
  const deleteCertificate = async (id) => {if(!window.confirm("Are you sure you want to delete this certificate?"))return;const token=localStorage.getItem("admin_token");if(!token){handleUnauthorized();return;}try{const r=await fetch(api(`/api/v1/admin/certificates/${id}`),{method:"DELETE",headers:{Authorization:`Bearer ${token}`}});if(r.status===401||r.status===403){handleUnauthorized();return;}if(!r.ok)throw new Error(`HTTP ${r.status}`);await fetchCertificates();}catch(e){console.error(e);alert("Unable to delete certificate.");}};

  // =========================
  // Logout
  // =========================
  const logout = () => {
    localStorage.removeItem("admin_token");

    if (typeof onLogout === "function") {
      onLogout();
    } else {
      window.location.hash = "/admin/login";
    }
  };

  return (
    <div className="admin-dashboard">
      {/* ================= HEADER ================= */}
      <header className="admin-header">
        <div>
          <h1>Portfolio Admin</h1>
          <p>Manage your portfolio content</p>
        </div>

        <button onClick={logout}>Logout</button>
      </header>

      {/* ================= MAIN ================= */}
      <main className="admin-content">
        <h2>Dashboard</h2>

        <p className="admin-welcome">Welcome back, Admin.</p>

        {/* ================= STATS ================= */}
        <div className="admin-cards">
          <div className="admin-card">
            <span>Messages</span>
            <strong>{messages.length}</strong>
          </div>

          <div className="admin-card">
            <span>Projects</span>
            <strong>{projectsCount}</strong>
          </div>

          <div className="admin-card">
            <span>Blog Posts</span>
            <strong>{blogPostsCount}</strong>
          </div>

          <div className="admin-card">
            <span>Skills</span>
            <strong>{skillsCount}</strong>
          </div>

          <div className="admin-card">
            <span>Certificates</span>
            <strong>{certificatesCount}</strong>
          </div>
        </div>

        {/* ================= PROJECTS ================= */}
        <section className="admin-messages">
          <div className="admin-section-header">
            <div>
              <h3>Projects</h3>
              <p>Manage projects displayed on your portfolio.</p>
            </div>

            <button className="admin-refresh" onClick={openCreateProject}>
              + Add Project
            </button>
          </div>

          {projectsLoading && (
            <p className="admin-state">Loading projects...</p>
          )}

          {!projectsLoading && projects.length === 0 && (
            <p className="admin-state">No projects found.</p>
          )}

          {!projectsLoading && projects.length > 0 && (
            <div className="admin-message-list">
              {projects.map((project) => (
                <article className="admin-message" key={project.id}>
                  <div className="admin-message-top">
                    <div>
                      <h4>{project.title}</h4>
                      <span>{project.category}</span>
                    </div>

                    <span className="message-status read">
                      #{project.displayOrder}
                    </span>
                  </div>

                  <p>{project.summary}</p>

                  {Array.isArray(project.tech) && project.tech.length > 0 && (
                    <small>{project.tech.join(" • ")}</small>
                  )}

                  <div className="admin-message-actions">
                    <button onClick={() => openEditProject(project)}>
                      Edit
                    </button>

                    <button
                      className="delete-message"
                      onClick={() => deleteProject(project.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ================= BLOG POSTS ================= */}
        <section className="admin-messages">
          <div className="admin-section-header">
            <div>
              <h3>Blog Posts</h3>
              <p>Manage published articles and drafts.</p>
            </div>

            <button className="admin-refresh" onClick={openCreateBlog}>
              + Add Blog Post
            </button>
          </div>

          {blogLoading && (
            <p className="admin-state">Loading blog posts...</p>
          )}

          {!blogLoading && blogPosts.length === 0 && (
            <p className="admin-state">No blog posts found.</p>
          )}

          {!blogLoading && blogPosts.length > 0 && (
            <div className="admin-message-list">
              {blogPosts.map((post) => (
                <article className="admin-message" key={post.id}>
                  <div className="admin-message-top">
                    <div>
                      <h4>{post.title}</h4>
                      <span>{post.slug}</span>
                    </div>

                    <span
                      className={
                        post.published
                          ? "message-status read"
                          : "message-status unread"
                      }
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>

                  <p>{post.excerpt}</p>

                  {post.publishedAt && (
                    <small>
                      Published:{" "}
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </small>
                  )}

                  <div className="admin-message-actions">
                    <button onClick={() => openEditBlog(post)}>Edit</button>

                    <button
                      className="delete-message"
                      onClick={() => deleteBlogPost(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ================= EDUCATION ================= */}
        <section className="admin-messages">
          <div className="admin-section-header">
            <div>
              <h3>Education</h3>
              <p>Manage educational background entries.</p>
            </div>

            <button className="admin-refresh" onClick={openCreateEducation}>
              + Add Education
            </button>
          </div>

          {educationLoading && (
            <p className="admin-state">Loading education...</p>
          )}

          {!educationLoading && education.length === 0 && (
            <p className="admin-state">No education records found.</p>
          )}

          {!educationLoading && education.length > 0 && (
            <div className="admin-message-list">
              {education.map((item) => (
                <article className="admin-message" key={item.id}>
                  <div className="admin-message-top">
                    <div>
                      <h4>{item.title}</h4>
                      <span>{item.school}</span>
                    </div>

                    <span className="message-status read">
                      #{item.displayOrder}
                    </span>
                  </div>

                  <p>{item.period}</p>
                  {item.score && <small>Score: {item.score}</small>}

                  <div className="admin-message-actions">
                    <button onClick={() => openEditEducation(item)}>
                      Edit
                    </button>

                    <button
                      className="delete-message"
                      onClick={() => deleteEducation(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ================= EXPERIENCE ================= */}
        <section className="admin-messages">
          <div className="admin-section-header">
            <div>
              <h3>Experience</h3>
              <p>Manage career and work experiences.</p>
            </div>

            <button className="admin-refresh" onClick={openCreateExperience}>
              + Add Experience
            </button>
          </div>

          {experienceLoading && (
            <p className="admin-state">Loading experience...</p>
          )}

          {!experienceLoading && experience.length === 0 && (
            <p className="admin-state">No experience records found.</p>
          )}

          {!experienceLoading && experience.length > 0 && (
            <div className="admin-message-list">
              {experience.map((item) => (
                <article className="admin-message" key={item.id}>
                  <div className="admin-message-top">
                    <div>
                      <h4>{item.title}</h4>
                      <span>{item.period}</span>
                    </div>

                    <span className="message-status read">
                      #{item.displayOrder}
                    </span>
                  </div>

                  {Array.isArray(item.points) && item.points.length > 0 && (
                    <ul>
                      {item.points.map((pt, idx) => (
                        <li key={idx}>{pt}</li>
                      ))}
                    </ul>
                  )}

                  <div className="admin-message-actions">
                    <button onClick={() => openEditExperience(item)}>
                      Edit
                    </button>

                    <button
                      className="delete-message"
                      onClick={() => deleteExperience(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ================= SKILLS ================= */}
        <section className="admin-messages">
          <div className="admin-section-header"><div><h3>Skills</h3><p>Manage skill groups and individual skills.</p></div><button className="admin-refresh" onClick={openCreateSkillGroup}>+ Add Skill Group</button></div>
          {skillsLoading && <p className="admin-state">Loading skills...</p>}
          {!skillsLoading && skillGroups.length===0 && <p className="admin-state">No skill groups found.</p>}
          {!skillsLoading && skillGroups.length>0 && <div className="admin-message-list">{skillGroups.map(group=><article className="admin-message" key={group.id}>
            <div className="admin-message-top"><div><h4>{group.title}</h4><span>Span: {group.span} • Order: #{group.displayOrder}</span></div><span className="message-status read">{Array.isArray(group.skills)?group.skills.length:0} skills</span></div>
            {Array.isArray(group.skills)&&group.skills.length>0 ? <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"12px",marginTop:"16px"}}>{group.skills.map(skill=><div key={skill.id} style={{padding:"14px",border:"1px solid rgba(127,127,127,.2)",borderRadius:"12px"}}><strong>{skill.name}</strong><small style={{display:"block",marginTop:"5px"}}>{skill.abbr||skill.icon||"No icon"} • #{skill.displayOrder}</small><div className="admin-message-actions"><button onClick={()=>openEditSkill(skill,group.id)}>Edit</button><button className="delete-message" onClick={()=>deleteSkill(skill.id)}>Delete</button></div></div>)}</div> : <p className="admin-state">No skills in this group.</p>}
            <div className="admin-message-actions"><button onClick={()=>openCreateSkill(group.id)}>+ Add Skill</button><button onClick={()=>openEditSkillGroup(group)}>Edit Group</button><button className="delete-message" onClick={()=>deleteSkillGroup(group.id)}>Delete Group</button></div>
          </article>)}</div>}
        </section>

        {/* ================= CERTIFICATES ================= */}
        <section className="admin-messages">
          <div className="admin-section-header"><div><h3>Certificates</h3><p>Manage your certifications and credential links.</p></div><button className="admin-refresh" onClick={openCreateCertificate}>+ Add Certificate</button></div>
          {certificatesLoading && <p className="admin-state">Loading certificates...</p>}
          {!certificatesLoading && certificates.length===0 && <p className="admin-state">No certificates found.</p>}
          {!certificatesLoading && certificates.length>0 && <div className="admin-message-list">{certificates.map(c=><article className="admin-message" key={c.id}>
            <div className="admin-message-top"><div><h4>{c.title}</h4><span>{c.issuer}</span></div><span className="message-status read">#{c.displayOrder}</span></div>
            <p>{c.abbr||"Certificate"}{c.bgColor?` • BG: ${c.bgColor}`:""}{c.fgColor?` • FG: ${c.fgColor}`:""}</p><small><a href={c.url} target="_blank" rel="noreferrer">{c.url}</a></small>
            <div className="admin-message-actions"><button onClick={()=>openEditCertificate(c)}>Edit</button><button className="delete-message" onClick={()=>deleteCertificate(c.id)}>Delete</button></div>
          </article>)}</div>}
        </section>

        {/* ================= CONTACT MESSAGES ================= */}
        <section className="admin-messages">
          <div className="admin-section-header">
            <div>
              <h3>Contact Messages</h3>
              <p>Messages submitted through your portfolio.</p>
            </div>

            <button
              className="admin-refresh"
              onClick={() => {
                fetchMessages();
                fetchDashboardStats();
              }}
            >
              Refresh
            </button>
          </div>

          {loading && (
            <p className="admin-state">Loading messages...</p>
          )}

          {error && (
            <p className="admin-state admin-error">{error}</p>
          )}

          {!loading && !error && messages.length === 0 && (
            <p className="admin-state">No contact messages yet.</p>
          )}

          {!loading && !error && messages.length > 0 && (
            <div className="admin-message-list">
              {messages.map((message) => (
                <article className="admin-message" key={message.id}>
                  <div className="admin-message-top">
                    <div>
                      <h4>{message.name}</h4>
                      <span>{message.email}</span>
                    </div>

                    <span
                      className={
                        message.read
                          ? "message-status read"
                          : "message-status unread"
                      }
                    >
                      {message.read ? "Read" : "Unread"}
                    </span>
                  </div>

                  <p>{message.message}</p>

                  {message.createdAt && (
                    <small>
                      {new Date(message.createdAt).toLocaleString()}
                    </small>
                  )}

                  <div className="admin-message-actions">
                    <button
                      onClick={() =>
                        setMessageReadStatus(message.id, !message.read)
                      }
                    >
                      {message.read ? "Mark Unread" : "Mark Read"}
                    </button>

                    <button
                      className="delete-message"
                      onClick={() => deleteMessage(message.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ================= EDUCATION MODAL ================= */}
      {showEducationForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <div>
                <h3>
                  {editingEducation ? "Edit Education" : "Add Education"}
                </h3>
                <p>Enter the education details.</p>
              </div>

              <button
                type="button"
                className="admin-modal-close"
                onClick={closeEducationForm}
                disabled={educationSaving}
              >
                ×
              </button>
            </div>

            <form className="admin-project-form" onSubmit={saveEducation}>
              {educationError && (
                <div className="admin-form-error">{educationError}</div>
              )}

              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Title *</label>
                  <input
                    name="title"
                    value={educationForm.title}
                    onChange={handleEducationChange}
                    required
                    maxLength={150}
                    placeholder="B.E. Computer Science and Engineering"
                  />
                </div>

                <div className="admin-form-group">
                  <label>School / College *</label>
                  <input
                    name="school"
                    value={educationForm.school}
                    onChange={handleEducationChange}
                    required
                    maxLength={150}
                    placeholder="Dhanalakshmi Srinivasan College of Engineering"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Period *</label>
                  <input
                    name="period"
                    value={educationForm.period}
                    onChange={handleEducationChange}
                    required
                    maxLength={50}
                    placeholder="2024 - 2028"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Score</label>
                  <input
                    name="score"
                    value={educationForm.score}
                    onChange={handleEducationChange}
                    maxLength={50}
                    placeholder="CGPA 8.5"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Display Order</label>
                  <input
                    type="number"
                    name="displayOrder"
                    value={educationForm.displayOrder}
                    onChange={handleEducationChange}
                    min="0"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Initials</label>
                  <input
                    name="initials"
                    value={educationForm.initials}
                    onChange={handleEducationChange}
                    maxLength={6}
                    placeholder="DSCE"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Logo URL</label>
                <input
                  type="url"
                  name="logoUrl"
                  value={educationForm.logoUrl}
                  onChange={handleEducationChange}
                  maxLength={255}
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="admin-form-actions">
                <button
                  type="button"
                  onClick={closeEducationForm}
                  disabled={educationSaving}
                >
                  Cancel
                </button>

                <button type="submit" disabled={educationSaving}>
                  {educationSaving
                    ? "Saving..."
                    : editingEducation
                    ? "Update Education"
                    : "Create Education"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EXPERIENCE MODAL ================= */}
      {showExperienceForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <div>
                <h3>
                  {editingExperience ? "Edit Experience" : "Add Experience"}
                </h3>
                <p>Enter the experience details.</p>
              </div>

              <button
                type="button"
                className="admin-modal-close"
                onClick={closeExperienceForm}
                disabled={experienceSaving}
              >
                ×
              </button>
            </div>

            <form className="admin-project-form" onSubmit={saveExperience}>
              {experienceError && (
                <div className="admin-form-error">{experienceError}</div>
              )}

              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Title *</label>
                  <input
                    name="title"
                    value={experienceForm.title}
                    onChange={handleExperienceChange}
                    required
                    maxLength={150}
                    placeholder="Java Full Stack Developer Intern"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Period *</label>
                  <input
                    name="period"
                    value={experienceForm.period}
                    onChange={handleExperienceChange}
                    required
                    maxLength={50}
                    placeholder="June 2026 - August 2026"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Display Order</label>
                  <input
                    type="number"
                    name="displayOrder"
                    value={experienceForm.displayOrder}
                    onChange={handleExperienceChange}
                    min="0"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Initials</label>
                  <input
                    name="initials"
                    value={experienceForm.initials}
                    onChange={handleExperienceChange}
                    maxLength={6}
                    placeholder="ABC"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Logo URL</label>
                <input
                  type="url"
                  name="logoUrl"
                  value={experienceForm.logoUrl}
                  onChange={handleExperienceChange}
                  maxLength={255}
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="admin-form-group">
                <label>Experience Points *</label>
                <textarea
                  name="points"
                  value={experienceForm.points}
                  onChange={handleExperienceChange}
                  required
                  rows={7}
                  placeholder={`One point per line
Built REST APIs using Spring Boot
Developed responsive React components
Worked with MySQL databases`}
                />
                <small>Enter one experience point per line.</small>
              </div>

              <div className="admin-form-actions">
                <button
                  type="button"
                  onClick={closeExperienceForm}
                  disabled={experienceSaving}
                >
                  Cancel
                </button>

                <button type="submit" disabled={experienceSaving}>
                  {experienceSaving
                    ? "Saving..."
                    : editingExperience
                    ? "Update Experience"
                    : "Create Experience"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= SKILL GROUP MODAL ================= */}
      {showSkillGroupForm && <div className="admin-modal-overlay"><div className="admin-modal"><div className="admin-modal-header"><div><h3>{editingSkillGroup?"Edit Skill Group":"Add Skill Group"}</h3><p>Configure the skill group.</p></div><button type="button" className="admin-modal-close" onClick={closeSkillGroupForm} disabled={skillGroupSaving}>×</button></div><form className="admin-project-form" onSubmit={saveSkillGroup}>{skillGroupError&&<div className="admin-form-error">{skillGroupError}</div>}<div className="admin-form-grid"><div className="admin-form-group"><label>Group Title *</label><input name="title" value={skillGroupForm.title} onChange={handleSkillGroupChange} required maxLength={100} placeholder="Programming Languages"/></div><div className="admin-form-group"><label>Grid Span *</label><input type="number" name="span" value={skillGroupForm.span} onChange={handleSkillGroupChange} min="1" max="6" required/></div><div className="admin-form-group"><label>Display Order</label><input type="number" name="displayOrder" value={skillGroupForm.displayOrder} onChange={handleSkillGroupChange} min="0"/></div></div><div className="admin-form-actions"><button type="button" onClick={closeSkillGroupForm} disabled={skillGroupSaving}>Cancel</button><button type="submit" disabled={skillGroupSaving}>{skillGroupSaving?"Saving...":editingSkillGroup?"Update Group":"Create Group"}</button></div></form></div></div>}

      {/* ================= SKILL MODAL ================= */}
      {showSkillForm && <div className="admin-modal-overlay"><div className="admin-modal"><div className="admin-modal-header"><div><h3>{editingSkill?"Edit Skill":"Add Skill"}</h3><p>Enter the skill details.</p></div><button type="button" className="admin-modal-close" onClick={closeSkillForm} disabled={skillSaving}>×</button></div><form className="admin-project-form" onSubmit={saveSkill}>{skillError&&<div className="admin-form-error">{skillError}</div>}<div className="admin-form-grid"><div className="admin-form-group"><label>Skill Name *</label><input name="name" value={skillForm.name} onChange={handleSkillChange} required maxLength={80} placeholder="Java"/></div><div className="admin-form-group"><label>Icon</label><input name="icon" value={skillForm.icon} onChange={handleSkillChange} maxLength={40} placeholder="java"/></div><div className="admin-form-group"><label>Abbreviation</label><input name="abbr" value={skillForm.abbr} onChange={handleSkillChange} maxLength={10} placeholder="JAVA"/></div><div className="admin-form-group"><label>Display Order</label><input type="number" name="displayOrder" value={skillForm.displayOrder} onChange={handleSkillChange} min="0"/></div></div><div className="admin-form-actions"><button type="button" onClick={closeSkillForm} disabled={skillSaving}>Cancel</button><button type="submit" disabled={skillSaving}>{skillSaving?"Saving...":editingSkill?"Update Skill":"Create Skill"}</button></div></form></div></div>}

      {/* ================= CERTIFICATE MODAL ================= */}
      {showCertificateForm && <div className="admin-modal-overlay"><div className="admin-modal"><div className="admin-modal-header"><div><h3>{editingCertificate?"Edit Certificate":"Add Certificate"}</h3><p>Enter the certificate details.</p></div><button type="button" className="admin-modal-close" onClick={closeCertificateForm} disabled={certificateSaving}>×</button></div><form className="admin-project-form" onSubmit={saveCertificate}>{certificateError&&<div className="admin-form-error">{certificateError}</div>}<div className="admin-form-grid"><div className="admin-form-group"><label>Title *</label><input name="title" value={certificateForm.title} onChange={handleCertificateChange} required maxLength={150} placeholder="Java Programming Certificate"/></div><div className="admin-form-group"><label>Issuer *</label><input name="issuer" value={certificateForm.issuer} onChange={handleCertificateChange} required maxLength={100} placeholder="Oracle"/></div><div className="admin-form-group"><label>Certificate URL *</label><input type="url" name="url" value={certificateForm.url} onChange={handleCertificateChange} required maxLength={255} placeholder="https://example.com/certificate"/></div><div className="admin-form-group"><label>Logo URL</label><input type="url" name="logoUrl" value={certificateForm.logoUrl} onChange={handleCertificateChange} maxLength={255} placeholder="https://example.com/logo.png"/></div><div className="admin-form-group"><label>Abbreviation</label><input name="abbr" value={certificateForm.abbr} onChange={handleCertificateChange} maxLength={10} placeholder="JAVA"/></div><div className="admin-form-group"><label>Display Order</label><input type="number" name="displayOrder" value={certificateForm.displayOrder} onChange={handleCertificateChange} min="0"/></div><div className="admin-form-group"><label>Background Color</label><input name="bgColor" value={certificateForm.bgColor} onChange={handleCertificateChange} maxLength={20} placeholder="#1f2937"/></div><div className="admin-form-group"><label>Foreground Color</label><input name="fgColor" value={certificateForm.fgColor} onChange={handleCertificateChange} maxLength={20} placeholder="#ffffff"/></div></div><div className="admin-form-actions"><button type="button" onClick={closeCertificateForm} disabled={certificateSaving}>Cancel</button><button type="submit" disabled={certificateSaving}>{certificateSaving?"Saving...":editingCertificate?"Update Certificate":"Create Certificate"}</button></div></form></div></div>}

      {/* ================= PROJECT MODAL ================= */}
      {showProjectForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <div>
                <h3>{editingProject ? "Edit Project" : "Add Project"}</h3>
                <p>Enter the project details.</p>
              </div>

              <button
                type="button"
                className="admin-modal-close"
                onClick={closeProjectForm}
                disabled={projectSaving}
              >
                ×
              </button>
            </div>

            <form className="admin-project-form" onSubmit={saveProject}>
              {projectError && (
                <div className="admin-form-error">{projectError}</div>
              )}

              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Title *</label>
                  <input
                    name="title"
                    value={projectForm.title}
                    onChange={handleProjectChange}
                    required
                    maxLength={150}
                    placeholder="Blood Donor Finder"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Category *</label>
                  <input
                    name="category"
                    value={projectForm.category}
                    onChange={handleProjectChange}
                    required
                    maxLength={50}
                    placeholder="Full Stack"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Slug</label>
                  <input
                    name="slug"
                    value={projectForm.slug}
                    onChange={handleProjectChange}
                    maxLength={120}
                    placeholder="blood-donor-finder"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Display Order</label>
                  <input
                    type="number"
                    name="displayOrder"
                    value={projectForm.displayOrder}
                    onChange={handleProjectChange}
                    min="0"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Summary *</label>
                <textarea
                  name="summary"
                  value={projectForm.summary}
                  onChange={handleProjectChange}
                  required
                  maxLength={500}
                  rows={3}
                  placeholder="Short project description..."
                />
              </div>

              <div className="admin-form-group">
                <label>Tagline</label>
                <input
                  name="tagline"
                  value={projectForm.tagline}
                  onChange={handleProjectChange}
                  maxLength={255}
                  placeholder="A short memorable project tagline"
                />
              </div>

              <div className="admin-form-group">
                <label>Overview</label>
                <textarea
                  name="overview"
                  value={projectForm.overview}
                  onChange={handleProjectChange}
                  maxLength={5000}
                  rows={5}
                  placeholder="Detailed project overview..."
                />
              </div>

              <div className="admin-form-group">
                <label>Features</label>
                <textarea
                  name="features"
                  value={projectForm.features}
                  onChange={handleProjectChange}
                  rows={6}
                  placeholder={`One feature per line
User Authentication
Donor Registration
Location Filtering`}
                />
                <small>Enter one feature per line.</small>
              </div>

              <div className="admin-form-group">
                <label>Technologies</label>
                <input
                  name="tech"
                  value={projectForm.tech}
                  onChange={handleProjectChange}
                  placeholder="React.js, Spring Boot, MySQL"
                />
                <small>Separate technologies with commas.</small>
              </div>

              <div className="admin-form-group">
                <label>Project Images</label>
                <textarea
                  name="images"
                  value={projectForm.images}
                  onChange={handleProjectChange}
                  rows={4}
                  placeholder={`/projects/project-1.png
/projects/project-2.png`}
                />
                <small>Enter one image URL per line.</small>
              </div>

              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Live URL</label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={projectForm.liveUrl}
                    onChange={handleProjectChange}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="admin-form-group">
                  <label>GitHub URL</label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={projectForm.githubUrl}
                    onChange={handleProjectChange}
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>

              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Icon</label>
                  <input
                    name="icon"
                    value={projectForm.icon}
                    onChange={handleProjectChange}
                    maxLength={40}
                    placeholder="heart"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Accent</label>
                  <input
                    name="accent"
                    value={projectForm.accent}
                    onChange={handleProjectChange}
                    maxLength={255}
                    placeholder="linear-gradient(...)"
                  />
                </div>
              </div>

              <div className="admin-form-actions">
                <button
                  type="button"
                  onClick={closeProjectForm}
                  disabled={projectSaving}
                >
                  Cancel
                </button>

                <button type="submit" disabled={projectSaving}>
                  {projectSaving
                    ? "Saving..."
                    : editingProject
                    ? "Update Project"
                    : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= BLOG MODAL ================= */}
      {showBlogForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <div>
                <h3>
                  {editingBlogPost ? "Edit Blog Post" : "Add Blog Post"}
                </h3>
                <p>Create an article or save it as a draft.</p>
              </div>

              <button
                type="button"
                className="admin-modal-close"
                onClick={closeBlogForm}
                disabled={blogSaving}
              >
                ×
              </button>
            </div>

            <form className="admin-project-form" onSubmit={saveBlogPost}>
              {blogError && (
                <div className="admin-form-error">{blogError}</div>
              )}

              <div className="admin-form-group">
                <label>Title *</label>
                <input
                  name="title"
                  value={blogForm.title}
                  onChange={handleBlogChange}
                  required
                  maxLength={200}
                  placeholder="My Roadmap to Become a Full Stack Developer"
                />
              </div>

              <div className="admin-form-group">
                <label>Slug</label>
                <input
                  name="slug"
                  value={blogForm.slug}
                  onChange={handleBlogChange}
                  maxLength={160}
                  placeholder="roadmap-full-stack-developer"
                />
                <small>Leave empty to generate automatically.</small>
              </div>

              <div className="admin-form-group">
                <label>Excerpt *</label>
                <textarea
                  name="excerpt"
                  value={blogForm.excerpt}
                  onChange={handleBlogChange}
                  required
                  maxLength={500}
                  rows={3}
                  placeholder="Short description of the article..."
                />
              </div>

              <div className="admin-form-group">
                <label>Content *</label>
                <textarea
                  name="content"
                  value={blogForm.content}
                  onChange={handleBlogChange}
                  required
                  maxLength={50000}
                  rows={12}
                  placeholder="Write your complete blog article here..."
                />
                <small>Maximum 50,000 characters.</small>
              </div>

              <div className="admin-form-group">
                <label>Cover URL</label>
                <input
                  name="coverUrl"
                  value={blogForm.coverUrl}
                  onChange={handleBlogChange}
                  maxLength={255}
                  placeholder="/blog/my-post.jpg"
                />
              </div>

              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Icon</label>
                  <input
                    name="icon"
                    value={blogForm.icon}
                    onChange={handleBlogChange}
                    maxLength={40}
                    placeholder="code"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Accent</label>
                  <input
                    name="accent"
                    value={blogForm.accent}
                    onChange={handleBlogChange}
                    maxLength={255}
                    placeholder="linear-gradient(...)"
                  />
                </div>
              </div>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "20px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="published"
                  checked={blogForm.published}
                  onChange={handleBlogChange}
                />
                <span>Publish this post</span>
              </label>

              <div className="admin-form-actions">
                <button
                  type="button"
                  onClick={closeBlogForm}
                  disabled={blogSaving}
                >
                  Cancel
                </button>

                <button type="submit" disabled={blogSaving}>
                  {blogSaving
                    ? "Saving..."
                    : editingBlogPost
                    ? "Update Post"
                    : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}