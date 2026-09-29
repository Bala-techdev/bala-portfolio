package com.balatechdev.portfolio.skill;

import com.balatechdev.portfolio.common.entity.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "skill_groups")
public class SkillGroup extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String title;

    @Column(name = "grid_span", nullable = false)
    private int span;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;

    // Deleting a group deletes its skills (cascade + orphanRemoval).
    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("displayOrder ASC")
    private List<Skill> skills = new ArrayList<>();

    protected SkillGroup() {
        // for JPA
    }

    public SkillGroup(String title, int span, int displayOrder) {
        this.title = title;
        this.span = span;
        this.displayOrder = displayOrder;
    }

    public String getTitle() {
        return title;
    }

    public int getSpan() {
        return span;
    }

    public int getDisplayOrder() {
        return displayOrder;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public void update(String title, int span, int displayOrder) {
        this.title = title;
        this.span = span;
        this.displayOrder = displayOrder;
    }
}