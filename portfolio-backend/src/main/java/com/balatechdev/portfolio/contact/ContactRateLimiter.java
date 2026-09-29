package com.balatechdev.portfolio.contact;

import com.balatechdev.portfolio.common.exception.RateLimitExceededException;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Sliding-window limiter: each key (client IP) may send at most N messages per window.
 * Counts live in memory, so they reset on restart and are not shared between servers.
 * That is fine for a single portfolio server. With several servers you would move this to Redis.
 */
@Component
public class ContactRateLimiter {

    private static final int CLEANUP_THRESHOLD = 1000;

    private final int maxRequests;
    private final Duration window;
    private final Map<String, Deque<Instant>> hits = new ConcurrentHashMap<>();

    public ContactRateLimiter(
            @Value("${app.contact.rate-limit.max-requests:5}") int maxRequests,
            @Value("${app.contact.rate-limit.window-minutes:60}") long windowMinutes) {
        this.maxRequests = maxRequests;
        this.window = Duration.ofMinutes(windowMinutes);
    }

    // Records one attempt for this key, or throws if the key is over its limit.
    public void checkAndRecord(String key) {
        Instant now = Instant.now();
        Instant cutoff = now.minus(window);
        long[] retryAfterSeconds = {0};

        // compute() runs atomically per key, so two simultaneous requests cannot both slip through
        hits.compute(key, (k, existing) -> {
            Deque<Instant> attempts = existing != null ? existing : new ArrayDeque<>();
            while (!attempts.isEmpty() && attempts.peekFirst().isBefore(cutoff)) {
                attempts.pollFirst();
            }
            if (attempts.size() >= maxRequests) {
                retryAfterSeconds[0] = Math.max(1, Duration.between(now, attempts.peekFirst().plus(window)).toSeconds());
            } else {
                attempts.addLast(now);
            }
            return attempts;
        });

        if (hits.size() > CLEANUP_THRESHOLD) {
            cleanup(cutoff);
        }
        if (retryAfterSeconds[0] > 0) {
            throw new RateLimitExceededException(retryAfterSeconds[0]);
        }
    }

    // Drops keys with no recent attempts so the map cannot grow forever
    private void cleanup(Instant cutoff) {
        for (String key : hits.keySet()) {
            hits.computeIfPresent(key, (k, attempts) -> {
                while (!attempts.isEmpty() && attempts.peekFirst().isBefore(cutoff)) {
                    attempts.pollFirst();
                }
                return attempts.isEmpty() ? null : attempts;
            });
        }
    }
}