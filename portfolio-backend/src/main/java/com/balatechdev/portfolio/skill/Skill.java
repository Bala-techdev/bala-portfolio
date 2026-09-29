package com.balatechdev.portfolio.skill;

import com.balatechdev.portfolio.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "skills")
public class Skill extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "group_id", nullable = false)
    private SkillGroup group;

    @Column(nullable = false, length = 80)
    private String name;

    // Key the React page uses to pick an icon, e.g. "java", "react", "docker"
    @Column(length = 40)
    private String icon;

    // Short text badge shown when there is no icon, e.g. "C" or "Hb"
    @Column(length = 10)
    private String abbr;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;

    protected Skill() {
        // for JPA
    }

    public Skill(SkillGroup group, String name, String icon, String abbr, int displayOrder) {
        this.group = group;
        this.name = name;
        this.icon = icon;
        this.abbr = abbr;
        this.displayOrder = displayOrder;
    }

    public SkillGroup getGroup() {
        return group;
    }

    public String getName() {
        return name;
    }

    public String getIcon() {
        return icon;
    }

    public String getAbbr() {
        return abbr;
    }

    public int getDisplayOrder() {
        return displayOrder;
    }

    public void update(String name, String icon, String abbr, int displayOrder) {
        this.name = name;
        this.icon = icon;
        this.abbr = abbr;
        this.displayOrder = displayOrder;
    }
}