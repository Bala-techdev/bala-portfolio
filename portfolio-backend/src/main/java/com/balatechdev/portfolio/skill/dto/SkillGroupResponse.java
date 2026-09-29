package com.balatechdev.portfolio.skill.dto;

import java.util.List;

public record SkillGroupResponse(
        Long id,
        String title,
        int span,
        int displayOrder,
        List<SkillResponse> skills) {
}