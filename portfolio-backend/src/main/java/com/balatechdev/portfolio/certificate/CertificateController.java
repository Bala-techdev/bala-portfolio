package com.balatechdev.portfolio.certificate;

import com.balatechdev.portfolio.certificate.dto.CertificateResponse;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/certificates")
public class CertificateController {

    private final CertificateService service;

    public CertificateController(CertificateService service) {
        this.service = service;
    }

    @GetMapping
    public List<CertificateResponse> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public CertificateResponse getOne(@PathVariable Long id) {
        return service.findById(id);
    }
}