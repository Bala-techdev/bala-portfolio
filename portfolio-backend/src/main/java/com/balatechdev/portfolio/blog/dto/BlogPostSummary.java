package com.balatechdev.portfolio.blog.dto;

import java.time.Instant;

public record BlogPostSummary(
        Long id,
        String slug,
        String title,
        String excerpt,
        String coverUrl,
        String accent,
        String icon,
        boolean published,
        Instant publishedAt,
        Instant createdAt,
        Instant updatedAt) {
}