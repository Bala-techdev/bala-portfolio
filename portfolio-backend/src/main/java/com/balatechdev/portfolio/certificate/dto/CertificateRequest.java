package com.balatechdev.portfolio.certificate.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

public record CertificateRequest(
        @NotBlank(message = "Title is required")
        @Size(max = 150, message = "Title must be at most 150 characters")
        String title,

        @NotBlank(message = "Issuer is required")
        @Size(max = 100, message = "Issuer must be at most 100 characters")
        String issuer,

        @NotBlank(message = "URL is required")
        @URL(message = "URL must be a valid http(s) address")
        @Size(max = 255, message = "URL must be at most 255 characters")
        String url,

        @Size(max = 255, message = "Logo URL must be at most 255 characters")
        String logoUrl,

        @Size(max = 10, message = "Abbr must be at most 10 characters")
        String abbr,

        @Size(max = 20, message = "Background color must be at most 20 characters")
        String bgColor,

        @Size(max = 20, message = "Foreground color must be at most 20 characters")
        String fgColor,

        @Min(value = 0, message = "Display order must be 0 or greater")
        Integer displayOrder) {
}