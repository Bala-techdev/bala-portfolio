import { useEffect, useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { apiUrl } from "../api/api";
import { FiArrowLeft } from "react-icons/fi";
import ProjectImage from "../components/ProjectImage";
import "./Blog.css";

export default function BlogPost({ id, onBack }) {
  const { loading: portfolioLoading } = usePortfolio();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadPost = async () => {
      try {
        setLoading(true);
        setError("");
        setPost(null);

        const response = await fetch(
          apiUrl(`/api/v1/blog/${id}`)
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (!cancelled) {
          setPost(data);
        }
      } catch (err) {
        console.error("Failed to load blog post:", err);

        if (!cancelled) {
          setError("Unable to load this blog post.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    if (id) {
      loadPost();
    } else {
      setLoading(false);
      setError("Post not found.");
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (portfolioLoading || loading) {
    return (
      <section className="bp">
        <button
          type="button"
          className="bp-back"
          onClick={onBack}
        >
          <FiArrowLeft aria-hidden="true" />
          Back to Blog
        </button>

        <p className="bp-date">
          Loading post...
        </p>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="bp">
        <button
          type="button"
          className="bp-back"
          onClick={onBack}
        >
          <FiArrowLeft aria-hidden="true" />
          Back to Blog
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
    ? new Date(post.publishedAt).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    : "";

  return (
    <article className="bp">
      <button
        type="button"
        className="bp-back"
        onClick={onBack}
      >
        <FiArrowLeft aria-hidden="true" />
        Back to Blog
      </button>

      <time
        className="bp-date"
        dateTime={isoDate}
      >
        {formattedDate}
      </time>

      <h1 className="bp-title">
        {post.title}
      </h1>

      <div className="bp-cover">
        <ProjectImage
          src={post.coverUrl}
          alt={`Cover for ${post.title}`}
          accent={post.accent}
          icon={post.icon}
        />
      </div>

      <div className="bp-body">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}