package com.balatechdev.portfolio.project;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.balatechdev.portfolio.common.exception.ConflictException;
import com.balatechdev.portfolio.project.dto.ProjectRequest;
import com.balatechdev.portfolio.project.dto.ProjectResponse;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@Transactional // each test's changes are rolled back afterwards, so tests cannot affect one another
class ProjectServiceIntegrationTest {

    @Autowired
    private ProjectService service;

    @Test
    void create_generatesASlugFromTheTitleWhenNoneIsGiven() {
        ProjectResponse created = service.create(sampleRequest("AI Phishing URL Detection!", null));

        assertThat(created.slug()).isEqualTo("ai-phishing-url-detection");
    }

    @Test
    void create_rejectsADuplicateSlug() {
        service.create(sampleRequest("Notes App", "notes-app"));

        assertThatThrownBy(() -> service.create(sampleRequest("Another Notes App", "notes-app")))
                .isInstanceOf(ConflictException.class);
    }

    @Test
    void findAll_filtersByCategory_caseInsensitively() {
        service.create(sampleRequestWithCategory("Blood Donor Finder", "Full Stack"));
        service.create(sampleRequestWithCategory("Phishing Detector", "AI/ML"));

        List<ProjectResponse> fullStackOnly = service.findAll("full stack");

        assertThat(fullStackOnly).extracting(ProjectResponse::title).containsExactly("Blood Donor Finder");
    }

    @Test
    void findAll_withAllOrNoCategory_returnsEverything() {
        service.create(sampleRequestWithCategory("One", "Full Stack"));
        service.create(sampleRequestWithCategory("Two", "AI/ML"));

        assertThat(service.findAll("All")).hasSize(2);
        assertThat(service.findAll(null)).hasSize(2);
    }

    private ProjectRequest sampleRequest(String title, String slug) {
        return new ProjectRequest(slug, title, "Full Stack", "Summary text", null, null,
                List.of("Feature one"), List.of("React.js"), List.of(), null, null, null, null, 0);
    }

    private ProjectRequest sampleRequestWithCategory(String title, String category) {
        return new ProjectRequest(null, title, category, "Summary text", null, null,
                List.of("Feature one"), List.of("React.js"), List.of(), null, null, null, null, 0);
    }
}