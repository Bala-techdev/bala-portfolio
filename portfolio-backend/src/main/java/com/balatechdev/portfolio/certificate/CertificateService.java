package com.balatechdev.portfolio.certificate;

import com.balatechdev.portfolio.certificate.dto.CertificateMapper;
import com.balatechdev.portfolio.certificate.dto.CertificateRequest;
import com.balatechdev.portfolio.certificate.dto.CertificateResponse;
import com.balatechdev.portfolio.common.exception.ResourceNotFoundException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class CertificateService {

    private final CertificateRepository repository;

    public CertificateService(CertificateRepository repository) {
        this.repository = repository;
    }

    public List<CertificateResponse> findAll() {
        return repository.findAllByOrderByDisplayOrderAsc().stream()
                .map(CertificateMapper::toResponse)
                .toList();
    }

    public CertificateResponse findById(Long id) {
        return CertificateMapper.toResponse(getOrThrow(id));
    }

    @Transactional
    public CertificateResponse create(CertificateRequest request) {
        Certificate entity = new Certificate(
                request.title(),
                request.issuer(),
                request.url(),
                request.logoUrl(),
                request.abbr(),
                request.bgColor(),
                request.fgColor(),
                request.displayOrder() != null ? request.displayOrder() : 0);
        return CertificateMapper.toResponse(repository.save(entity));
    }

    @Transactional
    public CertificateResponse update(Long id, CertificateRequest request) {
        Certificate entity = getOrThrow(id);
        entity.update(
                request.title(),
                request.issuer(),
                request.url(),
                request.logoUrl(),
                request.abbr(),
                request.bgColor(),
                request.fgColor(),
                request.displayOrder() != null ? request.displayOrder() : entity.getDisplayOrder());
        return CertificateMapper.toResponse(entity);
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Certificate", id);
        }
        repository.deleteById(id);
    }

    private Certificate getOrThrow(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate", id));
    }
}