CREATE TABLE education (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    school VARCHAR(150) NOT NULL,
    period VARCHAR(50) NOT NULL,
    score VARCHAR(50),
    logo_url VARCHAR(255),
    initials VARCHAR(6),
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_education_display_order ON education (display_order);