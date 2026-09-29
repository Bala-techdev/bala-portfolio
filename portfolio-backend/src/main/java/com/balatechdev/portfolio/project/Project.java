package com.balatechdev.portfolio.project;

import com.balatechdev.portfolio.common.entity.BaseEntity;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
@Table(name = "projects")
public class Project extends BaseEntity {

    @Column(nullable = false, unique = true, length = 120)
    private String slug;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(nullable = false, length = 500)
    private String summary;

    @Column(length = 255)
    private String tagline;

    @Column(columnDefinition = "TEXT")
    private String overview;

    @Column(name = "live_url")
    private String liveUrl;

    @Column(name = "github_url")
    private String githubUrl;

    @Column(length = 255)
    private String accent;

    @Column(length = 40)
    private String icon;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;

    // The three lists are loaded lazily, and SUBSELECT loads each one for ALL projects
    // in a single extra query, so listing 20 projects costs 4 queries, not 61.
    @ElementCollection
    @CollectionTable(name = "project_features", joinColumns = @JoinColumn(name = "project_id"))
    @OrderColumn(name = "item_order")
    @Column(name = "feature", nullable = false)
    @Fetch(FetchMode.SUBSELECT)
    private List<String> features = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "project_tech", joinColumns = @JoinColumn(name = "project_id"))
    @OrderColumn(name = "item_order")
    @Column(name = "tech", nullable = false)
    @Fetch(FetchMode.SUBSELECT)
    private List<String> tech = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "project_images", joinColumns = @JoinColumn(name = "project_id"))
    @OrderColumn(name = "item_order")
    @Column(name = "image_url", nullable = false)
    @Fetch(FetchMode.SUBSELECT)
    private List<String> images = new ArrayList<>();

    protected Project() {
        // for JPA
    }

    public Project(String slug, String title, String category, String summary, String tagline,
                   String overview, String liveUrl, String githubUrl, String accent, String icon,
                   int displayOrder, List<String> features, List<String> tech, List<String> images) {
        this.slug = slug;
        this.title = title;
        this.category = category;
        this.summary = summary;
        this.tagline = tagline;
        this.overview = overview;
        this.liveUrl = liveUrl;
        this.githubUrl = githubUrl;
        this.accent = accent;
        this.icon = icon;
        this.displayOrder = displayOrder;
        this.features.addAll(features);
        this.tech.addAll(tech);
        this.images.addAll(images);
    }

    public String getSlug() {
        return slug;
    }

    public String getTitle() {
        return title;
    }

    public String getCategory() {
        return category;
    }

    public String getSummary() {
        return summary;
    }

    public String getTagline() {
        return tagline;
    }

    public String getOverview() {
        return overview;
    }

    public String getLiveUrl() {
        return liveUrl;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public String getAccent() {
        return accent;
    }

    public String getIcon() {
        return icon;
    }

    public int getDisplayOrder() {
        return displayOrder;
    }

    public List<String> getFeatures() {
        return features;
    }

    public List<String> getTech() {
        return tech;
    }

    public List<String> getImages() {
        return images;
    }

    public void update(String slug, String title, String category, String summary, String tagline,
                       String overview, String liveUrl, String githubUrl, String accent, String icon,
                       int displayOrder, List<String> features, List<String> tech, List<String> images) {
        this.slug = slug;
        this.title = title;
        this.category = category;
        this.summary = summary;
        this.tagline = tagline;
        this.overview = overview;
        this.liveUrl = liveUrl;
        this.githubUrl = githubUrl;
        this.accent = accent;
        this.icon = icon;
        this.displayOrder = displayOrder;
        replace(this.features, features);
        replace(this.tech, tech);
        replace(this.images, images);
    }

    private static void replace(List<String> target, List<String> source) {
        target.clear();
        target.addAll(source);
    }
}