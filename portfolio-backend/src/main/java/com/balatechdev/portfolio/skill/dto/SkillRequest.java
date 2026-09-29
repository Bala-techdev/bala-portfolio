package com.balatechdev.portfolio.skill.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SkillRequest(
        @NotBlank(message = "Name is required")
        @Size(max = 80, message = "Name must be at most 80 characters")
        String name,

        @Size(max = 40, message = "Icon must be at most 40 characters")
        String icon,

        @Size(max = 10, message = "Abbr must be at most 10 characters")
        String abbr,

        @Min(value = 0, message = "Display order must be 0 or greater")
        Integer displayOrder) {
}