package com.balatechdev.portfolio.blog;

import com.balatechdev.portfolio.blog.dto.BlogPostResponse;
import com.balatechdev.portfolio.blog.dto.BlogPostSummary;
import com.balatechdev.portfolio.common.dto.PageResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/blog")
public class BlogController {

    private final BlogService service;

    public BlogController(BlogService service) {
        this.service = service;
    }

    // GET /api/v1/blog?page=0&size=9   (page numbers start at 0)
    @GetMapping
    public PageResponse<BlogPostSummary> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {
        return service.findPublished(page, size);
    }

    @GetMapping("/{slug}")
    public BlogPostResponse getBySlug(@PathVariable String slug) {
        return service.findPublishedBySlug(slug);
    }
}