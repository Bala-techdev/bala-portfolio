package com.balatechdev.portfolio.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class PublicApiCacheControlFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        if ("GET".equalsIgnoreCase(request.getMethod())
                && request.getRequestURI().startsWith("/api/v1/")
                && !request.getRequestURI().startsWith("/api/v1/admin/")) {
            response.setHeader(
                    "Cache-Control",
                    "no-store, no-cache, must-revalidate");
            response.setHeader("Pragma", "no-cache");
            response.setDateHeader("Expires", 0);
        }

        filterChain.doFilter(request, response);
    }
}
