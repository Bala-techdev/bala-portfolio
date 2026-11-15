package com.balatechdev.portfolio.image;

import com.balatechdev.portfolio.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "project_image_assets")
public class ProjectImageAsset extends BaseEntity {

    @Column(name = "project_id")
    private Long projectId;

    @Column(nullable = false, length = 255)
    private String imageUrl;

    @Column(nullable = false, length = 255)
    private String publicId;

    @Column(nullable = false, length = 255)
    private String originalFilename;

    @Column(nullable = false, length = 100)
    private String contentType;

    @Column(nullable = false)
    private long fileSize;

    protected ProjectImageAsset() {
        // for JPA
    }

    public ProjectImageAsset(
            String imageUrl,
            String publicId,
            String originalFilename,
            String contentType,
            long fileSize) {
        this.imageUrl = imageUrl;
        this.publicId = publicId;
        this.originalFilename = originalFilename;
        this.contentType = contentType;
        this.fileSize = fileSize;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getPublicId() {
        return publicId;
    }

    public String getOriginalFilename() {
        return originalFilename;
    }

    public String getContentType() {
        return contentType;
    }

    public long getFileSize() {
        return fileSize;
    }

    public void attachToProject(Long projectId) {
        this.projectId = projectId;
    }
}
