package com.balatechdev.portfolio.education.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record EducationRequest(
        @NotBlank(message = "Title is required")
        @Size(max = 150, message = "Title must be at most 150 characters")
        String title,

        @NotBlank(message = "School is required")
        @Size(max = 150, message = "School must be at most 150 characters")
        String school,

        @NotBlank(message = "Period is required")
        @Size(max = 50, message = "Period must be at most 50 characters")
        String period,

        @Size(max = 50, message = "Score must be at most 50 characters")
        String score,

        @Size(max = 255, message = "Logo URL must be at most 255 characters")
        String logoUrl,

        @Size(max = 6, message = "Initials must be at most 6 characters")
        String initials,

        @Min(value = 0, message = "Display order must be 0 or greater")
        Integer displayOrder) {
}