package com.balatechdev.portfolio.certificate;

import com.balatechdev.portfolio.certificate.dto.CertificateRequest;
import com.balatechdev.portfolio.certificate.dto.CertificateResponse;
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
@RequestMapping("/api/v1/admin/certificates")
public class AdminCertificateController {

    private final CertificateService service;

    public AdminCertificateController(CertificateService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CertificateResponse create(@Valid @RequestBody CertificateRequest request) {
        return service.create(request);
    }

    @PutMapping("/{id}")
    public CertificateResponse update(@PathVariable Long id, @Valid @RequestBody CertificateRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}