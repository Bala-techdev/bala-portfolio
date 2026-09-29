CREATE TABLE skill_groups (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    grid_span INT NOT NULL DEFAULT 3,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    group_id BIGINT NOT NULL,
    name VARCHAR(80) NOT NULL,
    icon VARCHAR(40),
    abbr VARCHAR(10),
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_skills_group FOREIGN KEY (group_id) REFERENCES skill_groups(id) ON DELETE CASCADE
);

CREATE INDEX idx_skill_groups_display_order ON skill_groups (display_order);
CREATE INDEX idx_skills_group_id ON skills (group_id);