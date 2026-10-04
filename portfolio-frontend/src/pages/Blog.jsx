import { useMemo } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { FiArrowRight } from "react-icons/fi";
import ProjectImage from "../components/ProjectImage";
import "./Blog.css";

const ALL_POSTS_URL = "https://medium.com/@your-username";

export default function Blog({ onOpenPost }) {
  const { portfolio, loading, error } = usePortfolio();

  const posts = useMemo(() => {
    const blogData = portfolio.blog;

    // Support both:
    // 1. Direct array response
    // 2. Spring Data paginated response with { content: [...] }
    const blogPosts = Array.isArray(blogData)
      ? blogData
      : Array.isArray(blogData?.content)
        ? blogData.content
        : [];

    return blogPosts.map((post) => ({
      ...post,
      isoDate: post.publishedAt?.slice(0, 10),
      date: post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          )
        : "",
    }));
  }, [portfolio.blog]);

  return (
    <section className="bl">
      <div className="bl-top">
        <div>
          <h1 className="bl-title">Blog</h1>

          <p className="bl-sub">
            Thoughts, learnings, and tech insights.
          </p>
        </div>

        <a
          className="pf-btn pf-btn-line bl-all"
          href={ALL_POSTS_URL}
          target="_blank"
          rel="noreferrer"
        >
          View All Posts
        </a>
      </div>

      {loading && <p>Loading blog posts...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="bl-grid">
          {posts.map((post) => (
            <article
              className="bl-card"
              key={post.id}
              onClick={() => onOpenPost(post.slug)}
            >
              <div className="bl-cover">
                <ProjectImage
                  src={post.coverUrl}
                  alt={`Cover for ${post.title}`}
                  accent={post.accent}
                  icon={post.icon}
                />
              </div>

              <div className="bl-body">
                <time
                  className="bl-date"
                  dateTime={post.isoDate}
                >
                  {post.date}
                </time>

                <h2 className="bl-h">{post.title}</h2>

                <p className="bl-excerpt">
                  {post.excerpt}
                </p>

                <button
                  type="button"
                  className="bl-more"
                >
                  Read More <FiArrowRight aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}