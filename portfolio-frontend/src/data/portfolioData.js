import { posts } from "./blog";
import { certificates } from "./certificates";
import { education } from "./education";
import { experience } from "./experience";
import { profile } from "./profile";
import { projects } from "./projects";
import { skillGroups } from "./skills";

const withId = (item, index, prefix) => ({
  ...item,
  id: item.id ?? `${prefix}-${index + 1}`,
});

export const fallbackProfile = profile;

export const fallbackSkills = skillGroups.map((group, groupIndex) => ({
  id: `skill-group-${groupIndex + 1}`,
  title: group.title,
  span: group.span,
  displayOrder: groupIndex,
  skills: group.items.map((skill, skillIndex) => ({
    ...skill,
    id: `skill-${groupIndex + 1}-${skillIndex + 1}`,
    displayOrder: skillIndex,
  })),
}));

export const fallbackExperience = experience.map((item, index) =>
  withId(
    {
      ...item,
      logoUrl: item.logoUrl ?? item.logo ?? null,
    },
    index,
    "experience"
  )
);

export const fallbackEducation = education.map((item, index) =>
  withId(
    {
      ...item,
      logoUrl: item.logoUrl ?? item.logo ?? null,
    },
    index,
    "education"
  )
);

export const fallbackCertifications = certificates.map((item, index) =>
  withId(
    {
      ...item,
      logoUrl: item.logoUrl ?? item.logo ?? null,
      bgColor: item.bgColor ?? item.bg ?? null,
      fgColor: item.fgColor ?? item.fg ?? null,
    },
    index,
    "certificate"
  )
);

export const fallbackPublications = posts.map((item, index) =>
  withId(
    {
      ...item,
      slug: item.slug ?? item.id,
      authors: item.authors ?? ["Bala S"],
      publicationStatus:
        item.publicationStatus ?? "Publication details pending verification",
      verificationDetails:
        item.verificationDetails ??
        "No external publication record has been provided.",
      publishedAt: item.publishedAt ?? item.isoDate,
      coverUrl: item.coverUrl ?? item.cover ?? null,
      content: Array.isArray(item.content)
        ? item.content.join("\n\n")
        : item.content,
    },
    index,
    "publication"
  )
);

const documentedProjectDetails = {
  "blood-donor-finder": {
    title: "AI-Based Blood Donor Matching System",
    problemStatement:
      "Help people find suitable blood donors using blood group and location information.",
    architecture:
      "React frontend connected to a Spring Boot REST API and MySQL persistence layer.",
    engineeringHighlights: [
      "JWT-based authentication",
      "Donor registration and search",
      "Blood request workflow",
      "Location-based filtering",
      "Responsive user interface",
    ],
    status: "Project documentation available",
  },
  "ai-phishing-url-detection": {
    problemStatement:
      "Identify potentially malicious URLs before a user follows them.",
    architecture:
      "React dashboard connected to a Python and Flask inference API.",
    engineeringHighlights: [
      "URL feature extraction",
      "Machine-learning classification workflow",
      "Real-time URL checking",
      "Analytics dashboard",
    ],
    status: "Project documentation available",
  },
  "notes-taking-application": {
    problemStatement:
      "Provide a secure, searchable place to create and organise notes.",
    architecture:
      "React frontend connected to a Node.js and Express API with MongoDB storage.",
    engineeringHighlights: [
      "Secure authentication",
      "Rich-text editing",
      "Search and tags",
      "Auto-save workflow",
      "Responsive design",
    ],
    status: "Project documentation available",
  },
};

const pendingProjects = [
  {
    id: "egaa-platform",
    slug: "egaa-platform",
    title: "EGAA Platform",
  },
  {
    id: "prepmasterapp",
    slug: "prepmasterapp",
    title: "PrepMasterApp",
  },
  {
    id: "linksnap",
    slug: "linksnap",
    title: "LinkSnap",
  },
  {
    id: "portfolio-v2",
    slug: "portfolio-v2",
    title: "Portfolio v2.0",
    problemStatement:
      "Present engineering work and verified professional information through a resilient portfolio experience.",
    architecture:
      "React and Vite frontend with BrowserRouter, static-first rendering, background API hydration, and a Spring Boot REST API.",
    engineeringHighlights: [
      "Static-first rendering",
      "Session-cached API hydration",
      "JWT-protected content management",
      "SEO-friendly browser routes",
      "Vercel SPA fallback support",
    ],
    status: "In development",
    tech: ["React.js", "Vite", "Java", "Spring Boot", "MySQL"],
  },
].map((project) => ({
  ...project,
  category: "Full Stack",
  summary:
    project.summary ??
    "Verified project description will be added after project documentation is provided.",
  tagline: "Project details pending verification.",
  overview:
    project.overview ??
    "Problem statement, architecture, engineering highlights, links and images are pending factual verification.",
  problemStatement:
    project.problemStatement ?? "Problem statement pending verification.",
  architecture:
    project.architecture ?? "Architecture details pending verification.",
  engineeringHighlights:
    project.engineeringHighlights ?? [
      "Engineering highlights pending verification.",
    ],
  tech: project.tech ?? [],
  images: project.images ?? [],
  githubUrl: project.githubUrl ?? null,
  liveUrl: project.liveUrl ?? null,
  status: project.status ?? "Details pending verification",
  accent: "linear-gradient(135deg, #334155 0%, #0f172a 100%)",
  icon: "code",
}));

export const fallbackProjects = [
  ...projects.map((item, index) =>
  withId(
    {
      ...item,
      slug: item.slug ?? item.id,
      ...documentedProjectDetails[item.id],
      problemStatement:
        documentedProjectDetails[item.id]?.problemStatement ??
        "Problem statement pending verification.",
      architecture:
        documentedProjectDetails[item.id]?.architecture ??
        "Architecture details pending verification.",
      engineeringHighlights:
        documentedProjectDetails[item.id]?.engineeringHighlights ??
        item.features,
      status:
        documentedProjectDetails[item.id]?.status ??
        "Details pending verification",
    },
    index,
    "project"
  )
  ),
  ...pendingProjects,
];

export const fallbackPortfolio = {
  profile: fallbackProfile,
  skills: fallbackSkills,
  experience: fallbackExperience,
  education: fallbackEducation,
  certificates: fallbackCertifications,
  publications: fallbackPublications,
  research: fallbackPublications,
  blog: fallbackPublications,
  projects: fallbackProjects,
};
