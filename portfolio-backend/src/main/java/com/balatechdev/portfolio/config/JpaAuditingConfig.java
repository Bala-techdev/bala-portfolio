package com.balatechdev.portfolio.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

// Fills createdAt / updatedAt automatically on every entity that extends BaseEntity.
// Kept in its own class (not on the main class) so it does not break slice tests later.
@Configuration
@EnableJpaAuditing
public class JpaAuditingConfig {
}