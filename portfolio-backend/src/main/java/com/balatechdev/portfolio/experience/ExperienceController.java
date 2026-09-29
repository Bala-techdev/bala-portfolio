package com.balatechdev.portfolio.experience;

import com.balatechdev.portfolio.experience.dto.ExperienceResponse;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/experience")
public class ExperienceController {

    private final ExperienceService service;

    public ExperienceController(ExperienceService service) {
        this.service = service;
    }

    @GetMapping
    public List<ExperienceResponse> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ExperienceResponse getOne(@PathVariable Long id) {
        return service.findById(id);
    }
}