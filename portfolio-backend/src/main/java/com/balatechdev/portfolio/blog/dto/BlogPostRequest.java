package com.balatechdev.portfolio.blog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record BlogPostRequest(
        // Optional: leave it out and it is generated from the title
        @Size(max = 160, message = "Slug must be at most 160 characters")
        @Pattern(regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$",
                message = "Slug may only contain lowercase letters, numbers and single hyphens")
        String slug,

        @NotBlank(message = "Title is required")
        @Size(max = 200, message = "Title must be at most 200 characters")
        String title,

        @NotBlank(message = "Excerpt is required")
        @Size(max = 500, message = "Excerpt must be at most 500 characters")
        String excerpt,

        @NotBlank(message = "Content is required")
        @Size(max = 50000, message = "Content must be at most 50000 characters")
        String content,

        @Size(max = 255, message = "Cover URL must be at most 255 characters")
        String coverUrl,

        @Size(max = 255, message = "Accent must be at most 255 characters")
        String accent,

        @Size(max = 40, message = "Icon must be at most 40 characters")
        String icon,

        // Omitted means false, so a post is a draft unless you say otherwise
        Boolean published) {
}