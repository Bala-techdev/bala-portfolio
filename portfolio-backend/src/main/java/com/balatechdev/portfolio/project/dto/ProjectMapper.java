package com.balatechdev.portfolio.project.dto;

import com.balatechdev.portfolio.project.Project;
import java.util.List;

public final class ProjectMapper {

    private ProjectMapper() {
    }

    public static ProjectResponse toResponse(Project entity) {
        return new ProjectResponse(
                entity.getId(),
                entity.getSlug(),
                entity.getTitle(),
                entity.getCategory(),
                entity.getSummary(),
                entity.getTagline(),
                entity.getOverview(),
                List.copyOf(entity.getFeatures()),
                List.copyOf(entity.getTech()),
                List.copyOf(entity.getImages()),
                entity.getAccent(),
                entity.getIcon(),
                entity.getLiveUrl(),
                entity.getGithubUrl(),
                entity.getDisplayOrder(),
                entity.getCreatedAt(),
                entity.getUpdatedAt());
    }
}