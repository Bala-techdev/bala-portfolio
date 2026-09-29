package com.balatechdev.portfolio.experience.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.util.List;

public record ExperienceRequest(
        @NotBlank(message = "Title is required")
        @Size(max = 150, message = "Title must be at most 150 characters")
        String title,

        @NotBlank(message = "Period is required")
        @Size(max = 50, message = "Period must be at most 50 characters")
        String period,

        @Size(max = 255, message = "Logo URL must be at most 255 characters")
        String logoUrl,

        @Size(max = 6, message = "Initials must be at most 6 characters")
        String initials,

        @Min(value = 0, message = "Display order must be 0 or greater")
        Integer displayOrder,

        @NotEmpty(message = "At least one point is required")
        List<@NotBlank(message = "A point cannot be blank") String> points) {
}