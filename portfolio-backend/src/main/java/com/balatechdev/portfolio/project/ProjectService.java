package com.balatechdev.portfolio.project;

import com.balatechdev.portfolio.common.exception.ConflictException;
import com.balatechdev.portfolio.common.exception.ResourceNotFoundException;
import com.balatechdev.portfolio.common.util.SlugUtil;
import com.balatechdev.portfolio.project.dto.ProjectMapper;
import com.balatechdev.portfolio.project.dto.ProjectRequest;
import com.balatechdev.portfolio.project.dto.ProjectResponse;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    // category = null, blank or "All" returns every project
    public List<ProjectResponse> findAll(String category) {
        List<Project> projects = (category == null || category.isBlank() || category.equalsIgnoreCase("all"))
                ? repository.findAllByOrderByDisplayOrderAsc()
                : repository.findAllByCategoryIgnoreCaseOrderByDisplayOrderAsc(category.trim());
        return projects.stream().map(ProjectMapper::toResponse).toList();
    }

    public ProjectResponse findBySlug(String slug) {
        return repository.findBySlug(slug)
                .map(ProjectMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Project", slug));
    }

    @Transactional
    public ProjectResponse create(ProjectRequest request) {
        String slug = resolveSlug(request);
        if (repository.existsBySlug(slug)) {
            throw new ConflictException("Slug already in use: " + slug);
        }

        Project entity = new Project(
                slug,
                request.title(),
                request.category(),
                request.summary(),
                request.tagline(),
                request.overview(),
                request.liveUrl(),
                request.githubUrl(),
                request.accent(),
                request.icon(),
                request.displayOrder() != null ? request.displayOrder() : 0,
                orEmpty(request.features()),
                orEmpty(request.tech()),
                orEmpty(request.images()));
        return ProjectMapper.toResponse(repository.save(entity));
    }

    @Transactional
    public ProjectResponse update(Long id, ProjectRequest request) {
        Project entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", id));

        String slug = resolveSlug(request);
        if (repository.existsBySlugAndIdNot(slug, id)) {
            throw new ConflictException("Slug already in use: " + slug);
        }

        entity.update(
                slug,
                request.title(),
                request.category(),
                request.summary(),
                request.tagline(),
                request.overview(),
                request.liveUrl(),
                request.githubUrl(),
                request.accent(),
                request.icon(),
                request.displayOrder() != null ? request.displayOrder() : entity.getDisplayOrder(),
                orEmpty(request.features()),
                orEmpty(request.tech()),
                orEmpty(request.images()));
        return ProjectMapper.toResponse(entity);
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Project", id);
        }
        repository.deleteById(id);
    }

    private static String resolveSlug(ProjectRequest request) {
        return (request.slug() == null || request.slug().isBlank())
                ? SlugUtil.slugify(request.title())
                : request.slug();
    }

    private static List<String> orEmpty(List<String> list) {
        return list == null ? List.of() : list;
    }
}