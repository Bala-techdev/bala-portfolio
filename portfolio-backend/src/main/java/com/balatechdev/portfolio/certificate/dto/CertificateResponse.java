package com.balatechdev.portfolio.certificate.dto;

import java.time.Instant;
import java.time.LocalDate;

public record CertificateResponse(
        Long id,
        String title,
        String issuer,
        LocalDate issueDate,
        String url,
        String logoUrl,
        String abbr,
        String bgColor,
        String fgColor,
        int displayOrder,
        Instant createdAt,
        Instant updatedAt) {

    public CertificateResponse(
            Long id,
            String title,
            String issuer,
            String url,
            String logoUrl,
            String abbr,
            String bgColor,
            String fgColor,
            int displayOrder,
            Instant createdAt,
            Instant updatedAt) {
        this(id, title, issuer, null, url, logoUrl, abbr, bgColor, fgColor,
                displayOrder, createdAt, updatedAt);
    }
}