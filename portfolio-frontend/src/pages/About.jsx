


import { useState } from "react";
import { FiImage } from "react-icons/fi";
import "./About.css";

/* EDIT YOUR DETAILS HERE */
const TITLE = "About Me";
const SUBTITLE = "Get to know more about me";
const PARAGRAPH =
  "I’m Bala S, a Computer Science Engineering student and aspiring Full Stack Java Developer. I enjoy building practical web applications and solving real-world problems through technology.I work with Java, Spring Boot, React, MySQL, and REST APIs, and I’m continuously improving my skills in Data Structures & Algorithms, AI/ML, and software development.I believe in learning by building. I enjoy turning ideas into useful applications, exploring new technologies, and improving my problem-solving skills every day.";

const INFO = [
  { label: "Name", value: "Bala S" },
  { label: "Location", value: "Coimbatore, India" },
  { label: "Education", value: "B.E CSE" },
  { label: "Interests", value: "Web Dev, AI/ML, DSA" },
  { label: "Open To", value: "Internships, Full-time" },
  { label: "Goal", value: "Build impactful products" },
];

const QUOTE = "Small Steps, Big Dreams.";
const AUTHOR = "Bala S";

const PHOTO = "/profile.png"; // put your photo in the "public" folder
const BANNER = "/about-banner.jpg"; // optional banner image in "public"

export default function About() {
  const [photoOk, setPhotoOk] = useState(true);

  return (
    <section className="ab">
      <div className="ab-grid">
        {/* Heading + paragraph */}
        <div className="ab-head">
          <h1 className="ab-title">{TITLE}</h1>
          <p className="ab-sub">{SUBTITLE}</p>
          <p className="ab-text">{PARAGRAPH}</p>
        </div>

        {/* Photo card */}
        <div className="ab-photo">
          <div className="ab-frame">
            {photoOk ? (
              <img
                className="ab-img"
                src={PHOTO}
                alt="Portrait of Bala S"
                onError={() => setPhotoOk(false)}
              />
            ) : (
              <div className="ab-slot">
                <FiImage aria-hidden="true" />
                <strong>Add your photo here</strong>
                <small>Save it as public/about.jpg</small>
              </div>
            )}
          </div>

          <div className="ab-badge" aria-hidden="true">
            <span>Always</span>
            <span>Learning</span>
          </div>
        </div>

        {/* Info cards */}
        <dl className="ab-cards">
          {INFO.map((item) => (
            <div className="ab-card" key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>

        {/* Quote banner */}
        <figure
          className="ab-banner"
          style={{
            backgroundImage: `url(${BANNER}), linear-gradient(120deg, #141821 0%, #2a3242 60%, #4a566d 100%)`,
          }}
        >
          <blockquote className="ab-quote">&ldquo; {QUOTE} &rdquo;</blockquote>
          <figcaption className="ab-author">&mdash; {AUTHOR}</figcaption>
        </figure>
      </div>
    </section>
  );
}