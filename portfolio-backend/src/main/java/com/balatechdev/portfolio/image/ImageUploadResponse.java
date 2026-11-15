package com.balatechdev.portfolio.image;

public record ImageUploadResponse(
        String imageUrl,
        String publicId,
        String originalFilename,
        String contentType,
        long fileSize) {
}
