package com.balatechdev.portfolio.blog;

import com.balatechdev.portfolio.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(name = "blog_posts")
public class BlogPost extends BaseEntity {

    @Column(nullable = false, unique = true, length = 160)
    private String slug;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 500)
    private String excerpt;

    // Raw markdown. The React page renders it.
    @Column(nullable = false, columnDefinition = "MEDIUMTEXT")
    private String content;

    @Column(name = "cover_url")
    private String coverUrl;

    @Column(length = 255)
    private String accent;

    @Column(length = 40)
    private String icon;

    @Column(nullable = false)
    private boolean published;

    // Set the first time the post is published; kept if you unpublish and republish later.
    @Column(name = "published_at")
    private Instant publishedAt;

    protected BlogPost() {
        // for JPA
    }

    public BlogPost(String slug, String title, String excerpt, String content,
                    String coverUrl, String accent, String icon, boolean published) {
        this.slug = slug;
        this.title = title;
        this.excerpt = excerpt;
        this.content = content;
        this.coverUrl = coverUrl;
        this.accent = accent;
        this.icon = icon;
        applyPublished(published);
    }

    public String getSlug() {
        return slug;
    }

    public String getTitle() {
        return title;
    }

    public String getExcerpt() {
        return excerpt;
    }

    public String getContent() {
        return content;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public String getAccent() {
        return accent;
    }

    public String getIcon() {
        return icon;
    }

    public boolean isPublished() {
        return published;
    }

    public Instant getPublishedAt() {
        return publishedAt;
    }

    public void update(String slug, String title, String excerpt, String content,
                       String coverUrl, String accent, String icon, boolean published) {
        this.slug = slug;
        this.title = title;
        this.excerpt = excerpt;
        this.content = content;
        this.coverUrl = coverUrl;
        this.accent = accent;
        this.icon = icon;
        applyPublished(published);
    }

    private void applyPublished(boolean published) {
        if (published && this.publishedAt == null) {
            this.publishedAt = Instant.now();
        }
        this.published = published;
    }
}