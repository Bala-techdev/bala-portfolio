package com.balatechdev.portfolio.education;

import com.balatechdev.portfolio.education.dto.EducationRequest;
import com.balatechdev.portfolio.education.dto.EducationResponse;
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
@RequestMapping("/api/v1/admin/education")
public class AdminEducationController {

    private final EducationService service;

    public AdminEducationController(EducationService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EducationResponse create(@Valid @RequestBody EducationRequest request) {
        return service.create(request);
    }

    @PutMapping("/{id}")
    public EducationResponse update(@PathVariable Long id, @Valid @RequestBody EducationRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}