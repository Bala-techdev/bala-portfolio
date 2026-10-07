package com.balatechdev.portfolio.portfolio;

import com.balatechdev.portfolio.blog.BlogService;
import com.balatechdev.portfolio.certificate.CertificateService;
import com.balatechdev.portfolio.education.EducationService;
import com.balatechdev.portfolio.experience.ExperienceService;
import com.balatechdev.portfolio.project.ProjectService;
import com.balatechdev.portfolio.skill.SkillService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/portfolio")
public class PortfolioController {

    private final ProjectService projectService;
    private final SkillService skillService;
    private final EducationService educationService;
    private final ExperienceService experienceService;
    private final CertificateService certificateService;
    private final BlogService blogService;

    public PortfolioController(
            ProjectService projectService,
            SkillService skillService,
            EducationService educationService,
            ExperienceService experienceService,
            CertificateService certificateService,
            BlogService blogService) {

        this.projectService = projectService;
        this.skillService = skillService;
        this.educationService = educationService;
        this.experienceService = experienceService;
        this.certificateService = certificateService;
        this.blogService = blogService;
    }

    @GetMapping
    public PortfolioResponse getPortfolio() {

        return new PortfolioResponse(
                projectService.findAll(null),
                skillService.findAllGroups(),
                educationService.findAll(),
                experienceService.findAll(),
                certificateService.findAll(),
                blogService.findPublished(0, 50).content()
        );
    }
}
