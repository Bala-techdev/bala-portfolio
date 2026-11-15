package com.balatechdev.portfolio.image;

import com.balatechdev.portfolio.config.CloudinaryProperties;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import java.io.IOException;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProjectImageService {

    public static final long MAX_FILE_SIZE = 10 * 1024 * 1024;

    private static final Map<String, String> SUPPORTED_TYPES = Map.of(
            "image/jpeg", "jpg",
            "image/png", "png",
            "image/webp", "webp",
            "image/gif", "gif",
            "application/pdf", "pdf");

    private final CloudinaryProperties properties;
    private final ProjectImageAssetRepository repository;

    public ProjectImageService(
            CloudinaryProperties properties,
            ProjectImageAssetRepository repository) {
        this.properties = properties;
        this.repository = repository;
    }

    @Transactional
    public ImageUploadResponse upload(MultipartFile file) {
        validate(file);

        if (isBlank(properties.cloudName())
                || isBlank(properties.apiKey())
                || isBlank(properties.apiSecret())) {
            throw new ImageStorageException(
                    "Cloudinary storage is not configured for this environment.",
                    null);
        }

        try {
            Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", properties.cloudName(),
                    "api_key", properties.apiKey(),
                    "api_secret", properties.apiSecret()));

            Map<?, ?> result = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "resource_type", "application/pdf".equals(file.getContentType())
                                    ? "raw"
                                    : "image",
                            "folder", isBlank(properties.folder())
                                    ? "portfolio/projects"
                                    : properties.folder()));

            String imageUrl = String.valueOf(result.get("secure_url"));
            String publicId = String.valueOf(result.get("public_id"));
            if (isBlank(imageUrl) || "null".equals(imageUrl)
                    || isBlank(publicId) || "null".equals(publicId)) {
                throw new ImageStorageException(
                        "Cloudinary returned an incomplete upload response.",
                        null);
            }

            ProjectImageAsset asset = repository.save(new ProjectImageAsset(
                    imageUrl,
                    publicId,
                    safeFilename(file.getOriginalFilename()),
                    file.getContentType(),
                    file.getSize()));

            return new ImageUploadResponse(
                    asset.getImageUrl(),
                    asset.getPublicId(),
                    asset.getOriginalFilename(),
                    asset.getContentType(),
                    asset.getFileSize());
        } catch (IOException | RuntimeException exception) {
            if (exception instanceof ImageStorageException storageException) {
                throw storageException;
            }
            throw new ImageStorageException(
                    "Unable to store the project image.",
                    exception);
        }
    }

    @Transactional
    public void attachToProject(Long projectId, java.util.Collection<String> imageUrls) {
        if (imageUrls == null || imageUrls.isEmpty()) {
            return;
        }
        repository.findAllByImageUrlIn(imageUrls)
                .forEach(asset -> asset.attachToProject(projectId));
    }

    private static void validate(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ImageValidationException("An image file is required.");
        }
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new ImageValidationException("Files must be 10 MB or smaller.");
        }

        String contentType = file.getContentType();
        if (!SUPPORTED_TYPES.containsKey(contentType)) {
            throw new ImageValidationException(
                    "Only JPG, PNG, WEBP, GIF and PDF files are supported.");
        }

        try {
            byte[] header = file.getInputStream().readNBytes(12);
            if (!matchesSignature(contentType, header)) {
                throw new ImageValidationException(
                        "The uploaded file does not match its image type.");
            }
        } catch (IOException exception) {
            throw new ImageValidationException("Unable to read the uploaded image.");
        }
    }

    private static boolean matchesSignature(String contentType, byte[] header) {
        return switch (contentType) {
            case "image/jpeg" -> header.length >= 3
                    && (header[0] & 0xff) == 0xff
                    && (header[1] & 0xff) == 0xd8
                    && (header[2] & 0xff) == 0xff;
            case "image/png" -> header.length >= 8
                    && (header[0] & 0xff) == 0x89
                    && header[1] == 0x50
                    && header[2] == 0x4e
                    && header[3] == 0x47
                    && header[4] == 0x0d
                    && header[5] == 0x0a
                    && header[6] == 0x1a
                    && header[7] == 0x0a;
            case "image/gif" -> header.length >= 6
                    && header[0] == 'G'
                    && header[1] == 'I'
                    && header[2] == 'F'
                    && header[3] == '8'
                    && (header[4] == '7' || header[4] == '9')
                    && header[5] == 'a';
            case "image/webp" -> header.length >= 12
                    && header[0] == 'R'
                    && header[1] == 'I'
                    && header[2] == 'F'
                    && header[3] == 'F'
                    && header[8] == 'W'
                    && header[9] == 'E'
                    && header[10] == 'B'
                    && header[11] == 'P';
            case "application/pdf" -> header.length >= 4
                    && header[0] == '%'
                    && header[1] == 'P'
                    && header[2] == 'D'
                    && header[3] == 'F';
            default -> false;
        };
    }

    private static String safeFilename(String filename) {
        if (filename == null || filename.isBlank()) {
            return "project-image";
        }
        return filename.replaceAll("[^A-Za-z0-9._-]", "_");
    }

    private static boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
