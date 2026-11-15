INSERT INTO projects (
    slug, title, category, summary, tagline, overview, live_url,
    github_url, accent, icon, status, display_order, created_at, updated_at
)
SELECT
    'egaa-platform',
    'EGAA Platform',
    'Full Stack',
    'Verified project description pending publication of the project documentation.',
    'Project details pending verification.',
    'Problem statement, architecture, engineering highlights, links and images are pending factual verification.',
    NULL,
    NULL,
    'linear-gradient(135deg, #334155 0%, #0f172a 100%)',
    'layers',
    'Details pending verification',
    10,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug = 'egaa-platform');

INSERT INTO projects (
    slug, title, category, summary, tagline, overview, live_url,
    github_url, accent, icon, status, display_order, created_at, updated_at
)
SELECT
    'prepmasterapp',
    'PrepMasterApp',
    'Full Stack',
    'Verified project description pending publication of the project documentation.',
    'Project details pending verification.',
    'Problem statement, architecture, engineering highlights, links and images are pending factual verification.',
    NULL,
    NULL,
    'linear-gradient(135deg, #4c6fff 0%, #22308f 100%)',
    'book',
    'Details pending verification',
    11,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug = 'prepmasterapp');

INSERT INTO projects (
    slug, title, category, summary, tagline, overview, live_url,
    github_url, accent, icon, status, display_order, created_at, updated_at
)
SELECT
    'linksnap',
    'LinkSnap',
    'Web Apps',
    'Verified project description pending publication of the project documentation.',
    'Project details pending verification.',
    'Problem statement, architecture, engineering highlights, links and images are pending factual verification.',
    NULL,
    NULL,
    'linear-gradient(135deg, #14b8a6 0%, #115e59 100%)',
    'link',
    'Details pending verification',
    12,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug = 'linksnap');

INSERT INTO projects (
    slug, title, category, summary, tagline, overview, live_url,
    github_url, accent, icon, status, display_order, created_at, updated_at
)
SELECT
    'portfolio-v2',
    'Portfolio v2.0',
    'Full Stack',
    'A recruiter-focused engineering portfolio with resilient static-first rendering and CMS-backed content.',
    'A professional portfolio engineering project.',
    'React and Vite frontend with BrowserRouter, background API hydration, session-cached data and a Spring Boot REST API.',
    NULL,
    NULL,
    'linear-gradient(135deg, #a855f7 0%, #581c87 100%)',
    'code',
    'In development',
    13,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug = 'portfolio-v2');

INSERT INTO blog_posts (
    slug, title, excerpt, content, cover_url, accent, icon, published,
    published_at, created_at, updated_at
)
SELECT
    'portfolio-v2-engineering-notes',
    'Portfolio v2.0 Engineering Notes',
    'Implementation notes for the static-first portfolio and its Spring Boot CMS.',
    'This entry records the verified implementation scope of Portfolio v2.0, including static-first rendering, background API hydration, clean browser routes and the protected CMS workflow.',
    NULL,
    'linear-gradient(135deg, #4c6fff 0%, #22308f 100%)',
    'code',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM blog_posts WHERE slug = 'portfolio-v2-engineering-notes'
);

INSERT INTO blog_posts (
    slug, title, excerpt, content, cover_url, accent, icon, published,
    published_at, created_at, updated_at
)
SELECT
    'blood-donor-matching-project-notes',
    'AI-Based Blood Donor Matching System: Project Notes',
    'A project record describing the documented scope of the blood donor matching system.',
    'This project record is maintained as a technical note. Additional publication and verification details should be added through the protected CMS when available.',
    NULL,
    'linear-gradient(135deg, #e5484d 0%, #a51111 100%)',
    'heart',
    FALSE,
    NULL,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM blog_posts WHERE slug = 'blood-donor-matching-project-notes'
);
