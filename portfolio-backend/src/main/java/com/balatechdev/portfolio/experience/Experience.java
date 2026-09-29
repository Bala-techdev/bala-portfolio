package com.balatechdev.portfolio.experience;

import com.balatechdev.portfolio.common.entity.BaseEntity;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "experience")
public class Experience extends BaseEntity {

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 50)
    private String period;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(length = 6)
    private String initials;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;

    // Stored in a separate "experience_points" table, one row per bullet,
    // in the order given (point_order). Loaded eagerly since the list is
    // always short and is needed every time an entry is shown.
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "experience_points", joinColumns = @JoinColumn(name = "experience_id"))
    @OrderColumn(name = "point_order")
    @Column(name = "point", nullable = false, columnDefinition = "TEXT")
    private List<String> points = new ArrayList<>();

    protected Experience() {
        // for JPA
    }

    public Experience(String title, String period, String logoUrl, String initials,
                      int displayOrder, List<String> points) {
        this.title = title;
        this.period = period;
        this.logoUrl = logoUrl;
        this.initials = initials;
        this.displayOrder = displayOrder;
        this.points = new ArrayList<>(points);
    }

    public String getTitle() {
        return title;
    }

    public String getPeriod() {
        return period;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public String getInitials() {
        return initials;
    }

    public int getDisplayOrder() {
        return displayOrder;
    }

    public List<String> getPoints() {
        return points;
    }

    public void update(String title, String period, String logoUrl, String initials,
                       int displayOrder, List<String> points) {
        this.title = title;
        this.period = period;
        this.logoUrl = logoUrl;
        this.initials = initials;
        this.displayOrder = displayOrder;
        this.points.clear();
        this.points.addAll(points);
    }
}