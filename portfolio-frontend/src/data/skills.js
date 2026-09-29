// "icon" must match a key in the ICONS list at the top of pages/Skills.jsx.
// Items without an icon show a small text badge instead (use "abbr" to set it).
// "span" is the card width out of 6 columns (3 = half, 6 = full width).
export const skillGroups = [
  {
    title: "Languages",
    span: 3,
    items: [
      { name: "Java", icon: "java" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Python", icon: "python" },
      { name: "C", abbr: "C" },
    ],
  },
  {
    title: "Frontend",
    span: 3,
    items: [
      { name: "React.js", icon: "react" },
      { name: "HTML5", icon: "html" },
      { name: "CSS3", icon: "css" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Bootstrap", icon: "bootstrap" },
    ],
  },
  {
    title: "Backend",
    span: 4,
    items: [
      { name: "Spring Boot", icon: "springboot" },
      { name: "REST API", icon: "rest" },
      { name: "Spring Security", icon: "security" },
      { name: "Hibernate", abbr: "Hb" },
      { name: "JWT", icon: "jwt" },
    ],
  },
  {
    title: "Database",
    span: 2,
    items: [
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Redis", icon: "redis" },
    ],
  },
  {
    title: "Tools & Others",
    span: 6,
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Docker", icon: "docker" },
      { name: "Postman", icon: "postman" },
      { name: "VS Code", icon: "vscode" },
    ],
  },
];