CREATE TABLE blog_posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(160) NOT NULL,
    title VARCHAR(200) NOT NULL,
    excerpt VARCHAR(500) NOT NULL,
    content MEDIUMTEXT NOT NULL,
    cover_url VARCHAR(255),
    accent VARCHAR(255),
    icon VARCHAR(40),
    published BOOLEAN NOT NULL DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT uk_blog_posts_slug UNIQUE (slug)
);

CREATE INDEX idx_blog_posts_published ON blog_posts (published, published_at);