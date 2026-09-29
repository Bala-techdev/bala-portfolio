package com.balatechdev.portfolio.experience.dto;

import java.time.Instant;
import java.util.List;

public record ExperienceResponse(
        Long id,
        String title,
        String period,
        String logoUrl,
        String initials,
        int displayOrder,
        List<String> points,
        Instant createdAt,
        Instant updatedAt) {
}