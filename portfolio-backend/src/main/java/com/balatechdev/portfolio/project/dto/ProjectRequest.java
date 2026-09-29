package com.balatechdev.portfolio.project.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.List;
import org.hibernate.validator.constraints.URL;

public record ProjectRequest(
        // Optional: leave it out and it is generated from the title
        @Size(max = 120, message = "Slug must be at most 120 characters")
        @Pattern(regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$",
                message = "Slug may only contain lowercase letters, numbers and single hyphens")
        String slug,

        @NotBlank(message = "Title is required")
        @Size(max = 150, message = "Title must be at most 150 characters")
        String title,

        @NotBlank(message = "Category is required")
        @Size(max = 50, message = "Category must be at most 50 characters")
        String category,

        @NotBlank(message = "Summary is required")
        @Size(max = 500, message = "Summary must be at most 500 characters")
        String summary,

        @Size(max = 255, message = "Tagline must be at most 255 characters")
        String tagline,

        @Size(max = 5000, message = "Overview must be at most 5000 characters")
        String overview,

        List<@NotBlank(message = "A feature cannot be blank") @Size(max = 255) String> features,

        List<@NotBlank(message = "A tech name cannot be blank") @Size(max = 60) String> tech,

        List<@NotBlank(message = "An image URL cannot be blank") @Size(max = 255) String> images,

        @Size(max = 255, message = "Accent must be at most 255 characters")
        String accent,

        @Size(max = 40, message = "Icon must be at most 40 characters")
        String icon,

        @URL(message = "Live URL must be a valid http(s) address")
        @Size(max = 255, message = "Live URL must be at most 255 characters")
        String liveUrl,

        @URL(message = "GitHub URL must be a valid http(s) address")
        @Size(max = 255, message = "GitHub URL must be at most 255 characters")
        String githubUrl,

        @Min(value = 0, message = "Display order must be 0 or greater")
        Integer displayOrder) {
}