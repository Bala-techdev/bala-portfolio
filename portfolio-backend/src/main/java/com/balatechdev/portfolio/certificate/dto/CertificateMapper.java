package com.balatechdev.portfolio.certificate.dto;

import com.balatechdev.portfolio.certificate.Certificate;

public final class CertificateMapper {

    private CertificateMapper() {
    }

    public static CertificateResponse toResponse(Certificate entity) {
        return new CertificateResponse(
                entity.getId(),
                entity.getTitle(),
                entity.getIssuer(),
                entity.getUrl(),
                entity.getLogoUrl(),
                entity.getAbbr(),
                entity.getBgColor(),
                entity.getFgColor(),
                entity.getDisplayOrder(),
                entity.getCreatedAt(),
                entity.getUpdatedAt());
    }
}