import { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGithub,
  FiArrowRight,
} from "react-icons/fi";
import "./Contact.css";

/* EDIT YOUR DETAILS HERE */
const EMAIL = "bala.selvarasu.dev@gmail.com";

const CONTACTS = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: FiMail,
  },
  {
    label: "Phone",
    value: "+91 6379865435",
    href: "tel:+916379865435",
    icon: FiPhone,
  },
  {
    label: "Location",
    value: "Coimbatore, India",
    icon: FiMapPin,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/bala-s",
    href: "https://www.linkedin.com/in/bala-s-160562370?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: FiLinkedin,
  },
  {
    label: "GitHub",
    value: "github.com/bala-techdev",
    href: "https://github.com/bala-techdev",
    icon: FiGithub,
  },
];

const EMPTY = {
  name: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");

  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setStatus("sending");

  try {
    const res = await fetch("/api/v1/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const responseText = await res.text();

    console.log("Contact API status:", res.status);
    console.log("Contact API response:", responseText);

    if (!res.ok) {
      throw new Error(
        `HTTP error: ${res.status} - ${responseText}`
      );
    }

    setForm(EMPTY);
    setStatus("sent");
  } catch (err) {
    console.error("Failed to send contact message:", err);
    setStatus("error");
  }
};

  const statusText = {
    sent: "Thanks! Your message has been sent.",
    error: "Something went wrong. Please try again or email me directly.",
  }[status];

  return (
    <section className="ct">
      <div className="ct-grid">
        {/* ---------- Left: heading + contact details ---------- */}
        <div className="ct-main">
          <h1 className="ct-title">Contact</h1>

          <p className="ct-sub">
            Let&apos;s build something amazing together.
          </p>

          <ul className="ct-list">
            {CONTACTS.map(({ label, value, href, icon: Icon }) => (
              <li className="ct-row" key={label}>
                <span className="ct-icon">
                  <Icon aria-hidden="true" />
                </span>

                <div>
                  <p className="ct-label">{label}</p>

                  {href ? (
                    <a
                      className="ct-value"
                      href={href}
                      target={
                        href.startsWith("http")
                          ? "_blank"
                          : undefined
                      }
                      rel="noreferrer"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="ct-value">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Right: message form ---------- */}
        <form className="ct-form" onSubmit={handleSubmit}>
          <label className="ct-sr" htmlFor="ct-name">
            Your Name
          </label>

          <input
            id="ct-name"
            className="ct-input"
            name="name"
            type="text"
            placeholder="Your Name"
            autoComplete="name"
            value={form.name}
            onChange={update}
            required
          />

          <label className="ct-sr" htmlFor="ct-email">
            Your Email
          </label>

          <input
            id="ct-email"
            className="ct-input"
            name="email"
            type="email"
            placeholder="Your Email"
            autoComplete="email"
            value={form.email}
            onChange={update}
            required
          />

          <label className="ct-sr" htmlFor="ct-message">
            Your Message
          </label>

          <textarea
            id="ct-message"
            className="ct-input ct-textarea"
            name="message"
            rows={6}
            placeholder="Your Message"
            value={form.message}
            onChange={update}
            minLength={10}
            maxLength={2000}
            required
          />

          <button
            type="submit"
            className="pf-btn pf-btn-dark ct-send"
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              "Sending..."
            ) : (
              <>
                Send Message{" "}
                <FiArrowRight aria-hidden="true" />
              </>
            )}
          </button>

          <p
            className={`ct-status ct-status-${status}`}
            role="status"
            aria-live="polite"
          >
            {statusText}
          </p>
        </form>
      </div>
    </section>
  );
}