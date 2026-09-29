package com.balatechdev.portfolio.education;

import com.balatechdev.portfolio.common.exception.ResourceNotFoundException;
import com.balatechdev.portfolio.education.dto.EducationMapper;
import com.balatechdev.portfolio.education.dto.EducationRequest;
import com.balatechdev.portfolio.education.dto.EducationResponse;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class EducationService {

    private final EducationRepository repository;

    public EducationService(EducationRepository repository) {
        this.repository = repository;
    }

    public List<EducationResponse> findAll() {
        return repository.findAllByOrderByDisplayOrderAsc().stream()
                .map(EducationMapper::toResponse)
                .toList();
    }

    public EducationResponse findById(Long id) {
        return EducationMapper.toResponse(getOrThrow(id));
    }

    @Transactional
    public EducationResponse create(EducationRequest request) {
        Education entity = new Education(
                request.title(),
                request.school(),
                request.period(),
                request.score(),
                request.logoUrl(),
                request.initials(),
                request.displayOrder() != null ? request.displayOrder() : 0);
        return EducationMapper.toResponse(repository.save(entity));
    }

    @Transactional
    public EducationResponse update(Long id, EducationRequest request) {
        Education entity = getOrThrow(id);
        entity.update(
                request.title(),
                request.school(),
                request.period(),
                request.score(),
                request.logoUrl(),
                request.initials(),
                request.displayOrder() != null ? request.displayOrder() : entity.getDisplayOrder());
        return EducationMapper.toResponse(entity);
        // no explicit save() needed: the entity is managed inside this transaction,
        // so Hibernate flushes the change automatically when the method returns.
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Education", id);
        }
        repository.deleteById(id);
    }

    private Education getOrThrow(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education", id));
    }
}