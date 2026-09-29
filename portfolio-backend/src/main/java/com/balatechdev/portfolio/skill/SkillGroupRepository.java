package com.balatechdev.portfolio.skill;

import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillGroupRepository extends JpaRepository<SkillGroup, Long> {

    // Loads every group together with its skills in ONE query,
    // instead of one extra query per group (the "N+1 problem").
    @EntityGraph(attributePaths = "skills")
    List<SkillGroup> findAllByOrderByDisplayOrderAsc();
}