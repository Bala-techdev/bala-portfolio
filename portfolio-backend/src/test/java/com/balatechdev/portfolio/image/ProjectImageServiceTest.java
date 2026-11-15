package com.balatechdev.portfolio.image;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;

import com.balatechdev.portfolio.config.CloudinaryProperties;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

class ProjectImageServiceTest {

    @Test
    void upload_whenCloudinaryConfigurationIsMissing_reportsBackendVariables() {
        ProjectImageService service = new ProjectImageService(
                new CloudinaryProperties("", "", "", "portfolio/projects"),
                mock(ProjectImageAssetRepository.class));
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "project.png",
                "image/png",
                new byte[] {
                        (byte) 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a
                });

        assertThatThrownBy(() -> service.upload(file))
                .isInstanceOf(ImageStorageException.class)
                .hasMessageContaining("CLOUDINARY_CLOUD_NAME")
                .hasMessageContaining("CLOUDINARY_API_KEY")
                .hasMessageContaining("CLOUDINARY_API_SECRET")
                .hasMessageNotContaining("api-secret");
    }
}
