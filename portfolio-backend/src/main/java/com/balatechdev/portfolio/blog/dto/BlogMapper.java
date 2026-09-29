package com.balatechdev.portfolio.blog.dto;

import com.balatechdev.portfolio.blog.BlogPost;

public final class BlogMapper {

    private BlogMapper() {
    }

    public static BlogPostResponse toResponse(BlogPost post) {
        return new BlogPostResponse(
                post.getId(),
                post.getSlug(),
                post.getTitle(),
                post.getExcerpt(),
                post.getContent(),
                post.getCoverUrl(),
                post.getAccent(),
                post.getIcon(),
                post.isPublished(),
                post.getPublishedAt(),
                post.getCreatedAt(),
                post.getUpdatedAt());
    }

    public static BlogPostSummary toSummary(BlogPost post) {
        return new BlogPostSummary(
                post.getId(),
                post.getSlug(),
                post.getTitle(),
                post.getExcerpt(),
                post.getCoverUrl(),
                post.getAccent(),
                post.getIcon(),
                post.isPublished(),
                post.getPublishedAt(),
                post.getCreatedAt(),
                post.getUpdatedAt());
    }
}