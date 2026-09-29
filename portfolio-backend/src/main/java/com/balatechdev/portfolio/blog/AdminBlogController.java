package com.balatechdev.portfolio.blog;

import com.balatechdev.portfolio.blog.dto.BlogPostRequest;
import com.balatechdev.portfolio.blog.dto.BlogPostResponse;
import com.balatechdev.portfolio.blog.dto.BlogPostSummary;
import com.balatechdev.portfolio.common.dto.PageResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/blog")
public class AdminBlogController {

    private final BlogService service;

    public AdminBlogController(BlogService service) {
        this.service = service;
    }

    // Every post, drafts included
    @GetMapping
    public PageResponse<BlogPostSummary> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return service.findAllForAdmin(page, size);
    }

    @GetMapping("/{id}")
    public BlogPostResponse getOne(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BlogPostResponse create(@Valid @RequestBody BlogPostRequest request) {
        return service.create(request);
    }

    @PutMapping("/{id}")
    public BlogPostResponse update(@PathVariable Long id, @Valid @RequestBody BlogPostRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}