CREATE TABLE certificates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    issuer VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    logo_url VARCHAR(255),
    abbr VARCHAR(10),
    bg_color VARCHAR(20),
    fg_color VARCHAR(20),
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_certificates_display_order ON certificates (display_order);