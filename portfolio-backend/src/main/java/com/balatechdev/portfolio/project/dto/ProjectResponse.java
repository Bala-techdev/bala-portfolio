package com.balatechdev.portfolio.project.dto;

import java.time.Instant;
import java.util.List;

public record ProjectResponse(
        Long id,
        String slug,
        String title,
        String category,
        String summary,
        String tagline,
        String overview,
        List<String> features,
        List<String> tech,
        List<String> images,
        String accent,
        String icon,
        String liveUrl,
        String githubUrl,
        int displayOrder,
        Instant createdAt,
        Instant updatedAt) {
}