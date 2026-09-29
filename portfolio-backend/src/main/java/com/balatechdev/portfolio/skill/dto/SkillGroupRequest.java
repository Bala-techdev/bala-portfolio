package com.balatechdev.portfolio.skill.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SkillGroupRequest(
        @NotBlank(message = "Title is required")
        @Size(max = 100, message = "Title must be at most 100 characters")
        String title,

        @Min(value = 1, message = "Span must be between 1 and 6")
        @Max(value = 6, message = "Span must be between 1 and 6")
        Integer span,

        @Min(value = 0, message = "Display order must be 0 or greater")
        Integer displayOrder) {
}