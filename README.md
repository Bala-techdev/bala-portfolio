# Bala S — Full Stack Developer Portfolio

A modern, responsive and full-stack developer portfolio built to showcase my
projects, technical skills, education, experience, certifications and
technical writing.

The project follows a full-stack architecture with a React + Vite frontend,
Spring Boot REST API backend and MySQL database.

---

## 🚀 Live Demo

🌐 **Portfolio:**  
https://bala-portfolio-teal.vercel.app/

💻 **GitHub Repository:**  
https://github.com/Bala-techdev/bala-portfolio

---

## 👨‍💻 About Me

Hi, I'm **Bala S**, a Computer Science Engineering student and aspiring
**Full Stack Java Developer**.

I enjoy building practical software applications, solving programming
problems and continuously learning new technologies.

My primary development focus is:

- Java
- Spring Boot
- React
- MySQL
- REST APIs
- Data Structures & Algorithms
- AI & Machine Learning

This portfolio represents my learning journey, projects, technical
experience and continuous growth as a software developer.

---

# ✨ Features

## 🌐 Portfolio Website

The portfolio provides a modern interface for presenting:

- Home
- About
- Education
- Experience
- Skills
- Projects
- Certificates
- Blog
- Resume
- Contact
- Admin dashboard

---

## 🏠 Home

The home page introduces:

- Developer profile
- Professional summary
- Technical focus
- Profile image
- Resume download
- Project navigation
- Social/contact links

---

## 👤 About

The About section provides:

- Personal introduction
- Developer profile
- Career interests
- Learning goals
- Professional information

---

## 🎓 Education

Displays educational information including:

- Institution
- Course/degree
- Academic period
- Academic score
- Institution logo/initials

---

## 💼 Experience

Displays professional and internship experience including:

- Organization
- Role
- Date/period
- Work description
- Experience highlights
- Organization logo

---

## 🛠️ Skills

The skills section displays technical skills and technologies used during
development.

Examples include:

- Java
- Spring Boot
- React
- JavaScript
- HTML
- CSS
- MySQL
- REST API
- Git
- GitHub
- Data Structures & Algorithms

---

## 🚀 Projects

Projects are loaded dynamically from the backend.

Each project can contain:

- Project title
- Description
- Technology stack
- Project image
- GitHub repository
- Live/demo link
- Project details

The project section also supports project detail navigation.

---

## 🏆 Certificates

The certificates section displays:

- Certificate title
- Issuing organization
- Certificate information
- Certificate image/logo
- Relevant links

---

## 📝 Blog

The portfolio includes a blog section for displaying technical articles
and learning content.

Blog posts can be managed through the backend.

---

## 📄 Resume

The portfolio provides a dedicated resume section with:

- Resume preview
- Resume download
- Professional information

---

## 📬 Contact

Visitors can send messages through the portfolio contact section.

The backend provides an API for handling contact messages.

---

# 🔐 Admin Dashboard

The project includes an admin area for managing portfolio content.

The admin functionality is protected using authentication and JWT-based
security.

Admin functionality includes management of:

- Projects
- Skills
- Education
- Experience
- Certificates
- Blog posts
- Contact messages

The backend contains separate admin endpoints for protected operations.

---

# 🏗️ System Architecture

The project follows a full-stack architecture:

```text
                    ┌──────────────────────┐
                    │      User / Visitor  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │      + Vite          │
                    └──────────┬───────────┘
                               │
                         REST API / HTTP
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Spring Boot API    │
                    │      Backend         │
                    └──────────┬───────────┘
                               │
                  ┌────────────┴────────────┐
                  │                         │
                  ▼                         ▼
          ┌───────────────┐        ┌────────────────┐
          │ Spring        │        │ JWT / Security │
          │ Data JPA      │        └────────────────┘
          └───────┬───────┘
                  │
                  ▼
          ┌───────────────┐
          │     MySQL     │
          │    Database   │
          └───────────────┘



bala-portfolio/
│
├── portfolio-frontend/
│   │
│   ├── public/
│   │   ├── profile.png
│   │   ├── resume.pdf
│   │   └── other assets
│   │
│   ├── src/
│   │   │
│   │   ├── api/
│   │   │
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProjectImage.jsx
│   │   │   ├── SectionHeading.jsx
│   │   │   ├── SkillCard.jsx
│   │   │   └── Timeline.jsx
│   │   │
│   │   ├── context/
│   │   │   └── PortfolioContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Certificates.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── BlogPost.jsx
│   │   │   ├── Resume.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── portfolio-backend/
│   │
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── balatechdev/
│   │   │   │           └── portfolio/
│   │   │   │
│   │   │   └── resources/
│   │   │
│   │   └── test/
│   │
│   ├── pom.xml
│   └── mvnw
│
└── README.md
