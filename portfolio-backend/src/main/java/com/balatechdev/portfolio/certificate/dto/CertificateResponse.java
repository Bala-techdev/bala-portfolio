package com.balatechdev.portfolio.certificate.dto;

import java.time.Instant;

public record CertificateResponse(
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
}