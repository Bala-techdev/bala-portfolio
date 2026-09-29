package com.balatechdev.portfolio.education;

import com.balatechdev.portfolio.education.dto.EducationResponse;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/education")
public class EducationController {

    private final EducationService service;

    public EducationController(EducationService service) {
        this.service = service;
    }

    @GetMapping
    public List<EducationResponse> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public EducationResponse getOne(@PathVariable Long id) {
        return service.findById(id);
    }
}