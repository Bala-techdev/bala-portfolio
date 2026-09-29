package com.balatechdev.portfolio.education;

import com.balatechdev.portfolio.common.entity.BaseEntity ;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "education")
public class Education extends BaseEntity {

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 150)
    private String school;

    @Column(nullable = false, length = 50)
    private String period;

    @Column(length = 50)
    private String score;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(length = 6)
    private String initials;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;

    protected Education() {
        // for JPA
    }

    public Education(String title, String school, String period, String score,
                     String logoUrl, String initials, int displayOrder) {
        this.title = title;
        this.school = school;
        this.period = period;
        this.score = score;
        this.logoUrl = logoUrl;
        this.initials = initials;
        this.displayOrder = displayOrder;
    }

    public String getTitle() {
        return title;
    }

    public String getSchool() {
        return school;
    }

    public String getPeriod() {
        return period;
    }

    public String getScore() {
        return score;
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

    // Used by the service on updates; entities stay mutable internally,
    // but only the service is allowed to call these — never the controller.
    public void update(String title, String school, String period, String score,
                       String logoUrl, String initials, int displayOrder) {
        this.title = title;
        this.school = school;
        this.period = period;
        this.score = score;
        this.logoUrl = logoUrl;
        this.initials = initials;
        this.displayOrder = displayOrder;
    }
}