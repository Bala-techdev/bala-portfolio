import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import ProjectImage from "../components/ProjectImage";
import "./Blog.css";

export default function BlogPost({ id, onBack }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    setPost(null);

    fetch(`/api/v1/blog/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load blog post:", err);
        setError("Unable to load this blog post.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <section className="bp">
        <button type="button" className="bp-back" onClick={onBack}>
          <FiArrowLeft aria-hidden="true" /> Back to Blog
        </button>

        <p className="bp-date">Loading post...</p>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="bp">
        <button type="button" className="bp-back" onClick={onBack}>
          <FiArrowLeft aria-hidden="true" /> Back to Blog
        </button>

        <p className="bp-date">
          {error || "Post not found."}
        </p>
      </section>
    );
  }

  const paragraphs = post.content
    ? post.content.split(/\n\s*\n/)
    : [];

  const isoDate = post.publishedAt?.slice(0, 10);

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "";

  return (
    <article className="bp">
      <button type="button" className="bp-back" onClick={onBack}>
        <FiArrowLeft aria-hidden="true" /> Back to Blog
      </button>

      <time className="bp-date" dateTime={isoDate}>
        {formattedDate}
      </time>

      <h1 className="bp-title">{post.title}</h1>

      <div className="bp-cover">
        <ProjectImage
          src={post.coverUrl}
          alt={`Cover for ${post.title}`}
          accent={post.accent}
          icon={post.icon}
        />
      </div>

      <div className="bp-body">
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}