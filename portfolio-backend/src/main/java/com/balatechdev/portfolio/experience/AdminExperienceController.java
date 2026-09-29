package com.balatechdev.portfolio.experience;

import com.balatechdev.portfolio.experience.dto.ExperienceRequest;
import com.balatechdev.portfolio.experience.dto.ExperienceResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/experience")
public class AdminExperienceController {

    private final ExperienceService service;

    public AdminExperienceController(ExperienceService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExperienceResponse create(@Valid @RequestBody ExperienceRequest request) {
        return service.create(request);
    }

    @PutMapping("/{id}")
    public ExperienceResponse update(@PathVariable Long id, @Valid @RequestBody ExperienceRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}