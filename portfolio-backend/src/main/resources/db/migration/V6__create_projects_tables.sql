CREATE TABLE projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(120) NOT NULL,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    summary VARCHAR(500) NOT NULL,
    tagline VARCHAR(255),
    overview TEXT,
    live_url VARCHAR(255),
    github_url VARCHAR(255),
    accent VARCHAR(255),
    icon VARCHAR(40),
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT uk_projects_slug UNIQUE (slug)
);

CREATE INDEX idx_projects_category ON projects (category);
CREATE INDEX idx_projects_display_order ON projects (display_order);

CREATE TABLE project_features (
    project_id BIGINT NOT NULL,
    item_order INT NOT NULL,
    feature VARCHAR(255) NOT NULL,
    PRIMARY KEY (project_id, item_order),
    CONSTRAINT fk_project_features_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE project_tech (
    project_id BIGINT NOT NULL,
    item_order INT NOT NULL,
    tech VARCHAR(60) NOT NULL,
    PRIMARY KEY (project_id, item_order),
    CONSTRAINT fk_project_tech_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE project_images (
    project_id BIGINT NOT NULL,
    item_order INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    PRIMARY KEY (project_id, item_order),
    CONSTRAINT fk_project_images_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);