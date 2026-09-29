package com.balatechdev.portfolio.experience;

import com.balatechdev.portfolio.common.exception.ResourceNotFoundException;
import com.balatechdev.portfolio.experience.dto.ExperienceMapper;
import com.balatechdev.portfolio.experience.dto.ExperienceRequest;
import com.balatechdev.portfolio.experience.dto.ExperienceResponse;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ExperienceService {

    private final ExperienceRepository repository;

    public ExperienceService(ExperienceRepository repository) {
        this.repository = repository;
    }

    public List<ExperienceResponse> findAll() {
        return repository.findAllByOrderByDisplayOrderAsc().stream()
                .map(ExperienceMapper::toResponse)
                .toList();
    }

    public ExperienceResponse findById(Long id) {
        return ExperienceMapper.toResponse(getOrThrow(id));
    }

    @Transactional
    public ExperienceResponse create(ExperienceRequest request) {
        Experience entity = new Experience(
                request.title(),
                request.period(),
                request.logoUrl(),
                request.initials(),
                request.displayOrder() != null ? request.displayOrder() : 0,
                request.points());
        return ExperienceMapper.toResponse(repository.save(entity));
    }

    @Transactional
    public ExperienceResponse update(Long id, ExperienceRequest request) {
        Experience entity = getOrThrow(id);
        entity.update(
                request.title(),
                request.period(),
                request.logoUrl(),
                request.initials(),
                request.displayOrder() != null ? request.displayOrder() : entity.getDisplayOrder(),
                request.points());
        return ExperienceMapper.toResponse(entity);
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Experience", id);
        }
        repository.deleteById(id);
    }

    private Experience getOrThrow(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience", id));
    }
}