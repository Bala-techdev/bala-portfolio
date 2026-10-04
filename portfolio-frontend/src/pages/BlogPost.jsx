import { useEffect, useMemo, useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { FiArrowLeft } from "react-icons/fi";
import ProjectImage from "../components/ProjectImage";
import "./Blog.css";

export default function BlogPost({ id, onBack }) {
  const {
    portfolio,
    loading,
    error: portfolioError,
  } = usePortfolio();

  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  const posts = useMemo(() => {
    const blogData = portfolio.blog;

    if (Array.isArray(blogData)) {
      return blogData;
    }

    if (Array.isArray(blogData?.content)) {
      return blogData.content;
    }

    return [];
  }, [portfolio.blog]);

  useEffect(() => {
    if (loading) {
      return;
    }

    setError("");

    console.log("BlogPost ID/slug:", id);
    console.log("Available posts:", posts);

    const foundPost = posts.find(
      (item) =>
        String(item.id) === String(id) ||
        String(item.slug) === String(id)
    );

    if (foundPost) {
      setPost(foundPost);
    } else {
      setPost(null);
      setError("Post not found.");
    }
  }, [id, loading, posts]);

  if (loading) {
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

  if (error || portfolioError || !post) {
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
          {error || portfolioError || "Post not found."}
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