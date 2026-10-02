package com.balatechdev.portfolio.contact;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.balatechdev.portfolio.common.exception.RateLimitExceededException;
import org.junit.jupiter.api.Test;

class ContactRateLimiterTest {

    @Test
    void allowsRequestsUpToTheLimit() {
        ContactRateLimiter limiter = new ContactRateLimiter(3, 60);

        limiter.checkAndRecord("1.2.3.4");
        limiter.checkAndRecord("1.2.3.4");
        limiter.checkAndRecord("1.2.3.4");
        // no exception means all three were accepted
    }

    @Test
    void blocksTheRequestAfterTheLimitIsReached() {
        ContactRateLimiter limiter = new ContactRateLimiter(2, 60);

        limiter.checkAndRecord("5.6.7.8");
        limiter.checkAndRecord("5.6.7.8");

        assertThatThrownBy(() -> limiter.checkAndRecord("5.6.7.8"))
                .isInstanceOf(RateLimitExceededException.class)
                .satisfies(ex ->
                        assertThat(((RateLimitExceededException) ex).getRetryAfterSeconds()).isPositive());
    }

    @Test
    void tracksDifferentKeysSeparately() {
        ContactRateLimiter limiter = new ContactRateLimiter(1, 60);

        limiter.checkAndRecord("9.9.9.9");
        limiter.checkAndRecord("8.8.8.8"); // a different key still has its own fresh allowance
    }
}