package com.balatechdev.portfolio.config;

import java.util.ArrayList;
import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.cloudinary")
public record CloudinaryProperties(
        String cloudName,
        String apiKey,
        String apiSecret,
        String folder) {

    public List<String> missingEnvironmentVariables() {
        List<String> missing = new ArrayList<>();
        if (isBlank(cloudName)) {
            missing.add("CLOUDINARY_CLOUD_NAME");
        }
        if (isBlank(apiKey)) {
            missing.add("CLOUDINARY_API_KEY");
        }
        if (isBlank(apiSecret)) {
            missing.add("CLOUDINARY_API_SECRET");
        }
        return List.copyOf(missing);
    }

    private static boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
