package com.balatechdev.portfolio.project;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findAllByOrderByDisplayOrderAsc();

    List<Project> findAllByCategoryIgnoreCaseOrderByDisplayOrderAsc(String category);

    Optional<Project> findBySlug(String slug);

    boolean existsBySlug(String slug);

    boolean existsBySlugAndIdNot(String slug, Long id);
}