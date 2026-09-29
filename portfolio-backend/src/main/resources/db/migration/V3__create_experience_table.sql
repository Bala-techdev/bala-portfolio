CREATE TABLE experience (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    period VARCHAR(50) NOT NULL,
    logo_url VARCHAR(255),
    initials VARCHAR(6),
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE experience_points (
    experience_id BIGINT NOT NULL,
    point_order INT NOT NULL,
    point TEXT NOT NULL,
    PRIMARY KEY (experience_id, point_order),
    CONSTRAINT fk_experience_points_experience
        FOREIGN KEY (experience_id) REFERENCES experience(id) ON DELETE CASCADE
);

CREATE INDEX idx_experience_display_order ON experience (display_order);