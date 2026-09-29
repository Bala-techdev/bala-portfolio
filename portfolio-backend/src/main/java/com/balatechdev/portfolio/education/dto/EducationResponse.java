package com.balatechdev.portfolio.education.dto;

import java.time.Instant;

public record EducationResponse(
        Long id,
        String title,
        String school,
        String period,
        String score,
        String logoUrl,
        String initials,
        int displayOrder,
        Instant createdAt,
        Instant updatedAt) {
}