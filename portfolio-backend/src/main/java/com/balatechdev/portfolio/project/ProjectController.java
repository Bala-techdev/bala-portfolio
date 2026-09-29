package com.balatechdev.portfolio.project;

import com.balatechdev.portfolio.project.dto.ProjectResponse;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    // GET /api/v1/projects               -> all projects
    // GET /api/v1/projects?category=AI/ML -> only that category
    @GetMapping
    public List<ProjectResponse> getAll(@RequestParam(required = false) String category) {
        return service.findAll(category);
    }

    @GetMapping("/{slug}")
    public ProjectResponse getBySlug(@PathVariable String slug) {
        return service.findBySlug(slug);
    }
}