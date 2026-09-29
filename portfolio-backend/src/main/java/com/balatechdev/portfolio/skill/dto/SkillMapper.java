package com.balatechdev.portfolio.skill.dto;

import com.balatechdev.portfolio.skill.Skill;
import com.balatechdev.portfolio.skill.SkillGroup;

public final class SkillMapper {

    private SkillMapper() {
    }

    public static SkillResponse toSkillResponse(Skill skill) {
        return new SkillResponse(
                skill.getId(),
                skill.getName(),
                skill.getIcon(),
                skill.getAbbr(),
                skill.getDisplayOrder());
    }

    public static SkillGroupResponse toGroupResponse(SkillGroup group) {
        return new SkillGroupResponse(
                group.getId(),
                group.getTitle(),
                group.getSpan(),
                group.getDisplayOrder(),
                group.getSkills().stream().map(SkillMapper::toSkillResponse).toList());
    }
}