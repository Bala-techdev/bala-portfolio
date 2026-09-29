package com.balatechdev.portfolio.education.dto;

import com.balatechdev.portfolio.education.Education ;

public final class EducationMapper {

    private EducationMapper() {
    }

    public static EducationResponse toResponse(Education entity) {
        return new EducationResponse(
                entity.getId(),
                entity.getTitle(),
                entity.getSchool(),
                entity.getPeriod(),
                entity.getScore(),
                entity.getLogoUrl(),
                entity.getInitials(),
                entity.getDisplayOrder(),
                entity.getCreatedAt(),
                entity.getUpdatedAt());
    }
}