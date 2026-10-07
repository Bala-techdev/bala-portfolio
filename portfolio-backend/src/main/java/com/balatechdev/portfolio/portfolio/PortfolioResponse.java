package com.balatechdev.portfolio.portfolio;

import com.balatechdev.portfolio.blog.dto.BlogPostSummary;
import com.balatechdev.portfolio.certificate.dto.CertificateResponse;
import com.balatechdev.portfolio.education.dto.EducationResponse;
import com.balatechdev.portfolio.experience.dto.ExperienceResponse;
import com.balatechdev.portfolio.project.dto.ProjectResponse;
import com.balatechdev.portfolio.skill.dto.SkillGroupResponse;

import java.util.List;

public record PortfolioResponse(
        List<ProjectResponse> projects,
        List<SkillGroupResponse> skills,
        List<EducationResponse> education,
        List<ExperienceResponse> experience,
        List<CertificateResponse> certificates,
        List<BlogPostSummary> blog
) {
}
