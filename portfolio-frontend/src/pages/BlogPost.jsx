import { FiArrowLeft } from "react-icons/fi";
import { posts } from "../data/blog";
import ProjectImage from "../components/ProjectImage";
import "./Blog.css";

export default function BlogPost({ id, onBack }) {
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <section className="bp">
        <button type="button" className="bp-back" onClick={onBack}>
          <FiArrowLeft aria-hidden="true" /> Back to Blog
        </button>
        <p className="bp-date">Post not found.</p>
      </section>
    );
  }

  return (
    <article className="bp">
      <button type="button" className="bp-back" onClick={onBack}>
        <FiArrowLeft aria-hidden="true" /> Back to Blog
      </button>

      <time className="bp-date" dateTime={post.isoDate}>
        {post.date}
      </time>
      <h1 className="bp-title">{post.title}</h1>

      <div className="bp-cover">
        <ProjectImage
          src={post.cover}
          alt={`Cover for ${post.title}`}
          accent={post.accent}
          icon={post.icon}
        />
      </div>

      <div className="bp-body">
        {post.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}