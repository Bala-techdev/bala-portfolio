export default function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <article key={`${item.date}-${item.title}`}>
          <time>{item.date}</time>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </article>
      ))}
    </div>
  );
}