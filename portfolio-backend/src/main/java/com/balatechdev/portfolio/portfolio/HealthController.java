package com.balatechdev.portfolio.portfolio;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    private static final DateTimeFormatter TIMESTAMP_FORMAT =
            DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    @GetMapping("/api/health")
    public Map<String, String> health() {
        String timestamp = LocalDateTime.now(ZoneOffset.UTC)
                .withNano(0)
                .format(TIMESTAMP_FORMAT);
        return Map.of("status", "UP", "timestamp", timestamp);
    }
}
