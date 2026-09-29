package com.balatechdev.portfolio.blog;

import com.balatechdev.portfolio.blog.dto.BlogMapper;
import com.balatechdev.portfolio.blog.dto.BlogPostRequest;
import com.balatechdev.portfolio.blog.dto.BlogPostResponse;
import com.balatechdev.portfolio.blog.dto.BlogPostSummary;
import com.balatechdev.portfolio.common.dto.PageResponse;
import com.balatechdev.portfolio.common.exception.ConflictException;
import com.balatechdev.portfolio.common.exception.ResourceNotFoundException;
import com.balatechdev.portfolio.common.util.SlugUtil;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class BlogService {

    private static final int MAX_PAGE_SIZE = 50;

    private final BlogPostRepository repository;

    public BlogService(BlogPostRepository repository) {
        this.repository = repository;
    }

    // ---------- Public (published posts only) ----------

    public PageResponse<BlogPostSummary> findPublished(int page, int size) {
        Sort newestFirst = Sort.by(Sort.Order.desc("publishedAt"), Sort.Order.desc("id"));
        return PageResponse.from(
                repository.findAllByPublishedTrue(pageable(page, size, newestFirst))
                        .map(BlogMapper::toSummary));
    }

    public BlogPostResponse findPublishedBySlug(String slug) {
        return repository.findBySlugAndPublishedTrue(slug)
                .map(BlogMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post", slug));
    }

    // ---------- Admin (drafts included) ----------

    public PageResponse<BlogPostSummary> findAllForAdmin(int page, int size) {
        Sort recentFirst = Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id"));
        return PageResponse.from(
                repository.findAll(pageable(page, size, recentFirst)).map(BlogMapper::toSummary));
    }

    public BlogPostResponse findById(Long id) {
        return BlogMapper.toResponse(getOrThrow(id));
    }

    @Transactional
    public BlogPostResponse create(BlogPostRequest request) {
        String slug = resolveSlug(request);
        if (repository.existsBySlug(slug)) {
            throw new ConflictException("Slug already in use: " + slug);
        }

        BlogPost post = new BlogPost(
                slug,
                request.title(),
                request.excerpt(),
                request.content(),
                request.coverUrl(),
                request.accent(),
                request.icon(),
                Boolean.TRUE.equals(request.published()));
        return BlogMapper.toResponse(repository.save(post));
    }

    @Transactional
    public BlogPostResponse update(Long id, BlogPostRequest request) {
        BlogPost post = getOrThrow(id);

        String slug = resolveSlug(request);
        if (repository.existsBySlugAndIdNot(slug, id)) {
            throw new ConflictException("Slug already in use: " + slug);
        }

        post.update(
                slug,
                request.title(),
                request.excerpt(),
                request.content(),
                request.coverUrl(),
                request.accent(),
                request.icon(),
                Boolean.TRUE.equals(request.published()));
        return BlogMapper.toResponse(post);
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Blog post", id);
        }
        repository.deleteById(id);
    }

    private BlogPost getOrThrow(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post", id));
    }

    private static String resolveSlug(BlogPostRequest request) {
        return (request.slug() == null || request.slug().isBlank())
                ? SlugUtil.slugify(request.title(), "post")
                : request.slug();
    }

    // Keeps a client from asking for page -1 or 100000 posts at once
    private static Pageable pageable(int page, int size, Sort sort) {
        int safePage = Math.max(page, 0);
        int safeSize = Math.min(Math.max(size, 1), MAX_PAGE_SIZE);
        return PageRequest.of(safePage, safeSize, sort);
    }
}