// Covers are optional: put images in "public/blog". Missing images show a colored placeholder.
// "content" is a list of paragraphs. The text below is sample text, so replace it with your own posts.
export const posts = [
  {
    id: "roadmap-full-stack-developer",
    date: "Aug 20, 2026",
    isoDate: "2026-08-20",
    title: "My Roadmap to Become a Full Stack Developer",
    excerpt: "A complete guide on how I'm learning and improving day by day.",
    cover: "/blog/roadmap.jpg",
    accent: "linear-gradient(135deg, #4c6fff 0%, #22308f 100%)",
    icon: "code",
    content: [
      "This is where the full story of your roadmap goes: what you learned first, what you are learning now, and what comes next.",
      "Break it into small sections so it is easy to read. Mention the resources, projects and habits that helped you most.",
    ],
  },
  {
    id: "learned-from-building-my-portfolio",
    date: "Aug 10, 2026",
    isoDate: "2026-08-10",
    title: "What I Learned from Building my Portfolio",
    excerpt: "Key takeaways and mistakes to avoid.",
    cover: "/blog/portfolio.jpg",
    accent: "linear-gradient(135deg, #475569 0%, #1e293b 100%)",
    icon: "edit",
    content: [
      "Start from a clear design and break it into small reusable components before writing any code.",
      "Keep your content in data files so updating the site never means editing layout code. Test on a phone early, not at the end.",
    ],
  },
  {
    id: "top-10-dsa-resources",
    date: "Aug 01, 2026",
    isoDate: "2026-08-01",
    title: "Top 10 DSA Resources for Placements",
    excerpt: "Resources that actually helped me.",
    cover: "/blog/dsa.jpg",
    accent: "linear-gradient(135deg, #171b26 0%, #0b0d14 100%)",
    icon: "code",
    content: [
      "List the resources that really helped you here, with one line on why each one is worth it.",
      "Consistent daily practice usually beats long, irregular sessions. Share how you organised your own practice.",
    ],
  },
];