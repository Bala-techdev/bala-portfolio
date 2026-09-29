package com.balatechdev.portfolio.experience.dto;

import com.balatechdev.portfolio.experience.Experience;

public final class ExperienceMapper {

    private ExperienceMapper() {
    }

    public static ExperienceResponse toResponse(Experience entity) {
        return new ExperienceResponse(
                entity.getId(),
                entity.getTitle(),
                entity.getPeriod(),
                entity.getLogoUrl(),
                entity.getInitials(),
                entity.getDisplayOrder(),
                entity.getPoints(),
                entity.getCreatedAt(),
                entity.getUpdatedAt());
    }
}