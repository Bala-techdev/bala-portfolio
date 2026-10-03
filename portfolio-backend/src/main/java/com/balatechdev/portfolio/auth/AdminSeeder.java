package com.balatechdev.portfolio.auth;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

// Creates the one admin account on first startup, from environment variables.
// Does nothing once any admin already exists, so it is safe to run every time.
@Component
public class AdminSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminSeeder.class);

    private final AdminUserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final String adminUsername;
    private final String adminPassword;

    public AdminSeeder(
            AdminUserRepository repository,
            PasswordEncoder passwordEncoder,
            @Value("${app.admin.username}") String adminUsername,
            @Value("${app.admin.password}") String adminPassword) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.adminUsername = adminUsername;
        this.adminPassword = adminPassword;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) {
            return;
        }

        repository.save(
                new AdminUser(
                        adminUsername,
                        passwordEncoder.encode(adminPassword)
                )
        );

        log.info("Seeded initial admin user '{}'", adminUsername);
    }
}