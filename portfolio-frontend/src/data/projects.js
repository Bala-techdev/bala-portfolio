export const CATEGORIES = ["All", "Full Stack", "AI/ML", "Web Apps", "Java", "Other"];

// Put screenshots in the "public/projects" folder and list them in "images".
// The first image is the card thumbnail. Missing images show a colored placeholder.
export const projects = [
  {
    id: "blood-donor-finder",
    title: "Blood Donor Finder",
    category: "Full Stack",
    summary:
      "A platform to connect blood donors with those in need. Real-time search, location filtering, and notifications.",
    tagline: "A full-stack platform to connect blood donors with those in need.",
    overview:
      "Blood Donor Finder helps people find blood donors quickly based on blood group and location. It provides real-time search, donor registration, and request management with email notifications.",
    features: [
      "User Authentication (JWT)",
      "Donor Registration & Search",
      "Blood Request System",
      "Location-based Filtering",
      "Email Notifications",
      "Responsive Design",
    ],
    tech: ["React.js", "Spring Boot", "MySQL", "Tailwind CSS"],
    images: [
      "/projects/blood-donor-1.png",
      "/projects/blood-donor-2.png",
      "/projects/blood-donor-3.png",
    ],
    accent: "linear-gradient(135deg, #e5484d 0%, #a51111 100%)",
    icon: "heart",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/blood-donor-finder",
  },
  {
    id: "ai-phishing-url-detection",
    title: "AI Phishing URL Detection",
    category: "AI/ML",
    summary:
      "Machine learning model to detect phishing URLs with high accuracy and real-time analysis dashboard.",
    tagline: "A machine learning tool that flags phishing links in real time.",
    overview:
      "This project analyses URL features and uses a trained classifier to decide whether a link is safe or a phishing attempt. A simple dashboard shows results and model performance.",
    features: [
      "URL Feature Extraction",
      "ML Classification Model",
      "Real-time URL Checking",
      "Analytics Dashboard",
      "Model Accuracy Report",
      "REST API Support",
    ],
    tech: ["Python", "Scikit-learn", "Flask", "React.js"],
    images: [
      "/projects/phishing-1.png",
      "/projects/phishing-2.png",
      "/projects/phishing-3.png",
    ],
    accent: "linear-gradient(135deg, #171b26 0%, #0b0d14 100%)",
    icon: "shield",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/phishing-url-detection",
  },
  {
    id: "notes-taking-application",
    title: "Notes Taking Application",
    category: "Full Stack",
    summary:
      "A modern notes app with authentication, rich text editing, and cloud storage support.",
    tagline: "A clean, fast notes app that keeps your ideas in sync.",
    overview:
      "A full-stack notes application where users can sign in, write notes with a rich text editor, organise them with tags, and access them from any device.",
    features: [
      "Secure Authentication",
      "Rich Text Editor",
      "Cloud Storage",
      "Search & Tags",
      "Auto-save",
      "Responsive Design",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
    images: [
      "/projects/notes-1.png",
      "/projects/notes-2.png",
      "/projects/notes-3.png",
    ],
    accent: "linear-gradient(135deg, #4c6fff 0%, #22308f 100%)",
    icon: "edit",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/notes-app",
  },
];