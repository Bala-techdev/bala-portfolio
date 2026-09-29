package com.balatechdev.portfolio.common.util;

import java.text.Normalizer;
import java.util.Locale;

public final class SlugUtil {

    private SlugUtil() {
    }

    public static String slugify(String input) {
        return slugify(input, "project");
    }

    // "My Roadmap: Full Stack!" -> "my-roadmap-full-stack"
    // If nothing usable is left (e.g. a title made only of symbols), returns the fallback.
    public static String slugify(String input, String fallback) {
        String withoutAccents = Normalizer.normalize(input, Normalizer.Form.NFD).replaceAll("\\p{M}", "");
        String slug = withoutAccents.toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-+|-+$)", "");
        return slug.isEmpty() ? fallback : slug;
    }
}