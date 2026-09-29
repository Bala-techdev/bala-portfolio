import { FiArrowRight } from "react-icons/fi";
import { posts } from "../data/blog";
import ProjectImage from "../components/ProjectImage";
import "./Blog.css";

const ALL_POSTS_URL = "https://medium.com/@your-username"; // "View All Posts" button

export default function Blog({ onOpenPost }) {
  return (
    <section className="bl">
      <div className="bl-top">
        <div>
          <h1 className="bl-title">Blog</h1>
          <p className="bl-sub">Thoughts, learnings, and tech insights.</p>
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

      <div className="bl-grid">
        {posts.map((post) => (
          /* The whole card is clickable. The Read More button makes it keyboard friendly. */
          <article
            className="bl-card"
            key={post.id}
            onClick={() => onOpenPost(post.id)}
          >
            <div className="bl-cover">
              <ProjectImage
                src={post.cover}
                alt={`Cover for ${post.title}`}
                accent={post.accent}
                icon={post.icon}
              />
            </div>

            <div className="bl-body">
              <time className="bl-date" dateTime={post.isoDate}>
                {post.date}
              </time>
              <h2 className="bl-h">{post.title}</h2>
              <p className="bl-excerpt">{post.excerpt}</p>
              <button type="button" className="bl-more">
                Read More <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}