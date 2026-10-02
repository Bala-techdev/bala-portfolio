package com.balatechdev.portfolio.education;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
//import static org.springframework.security.authorization.ConditionalAuthorizationManager.when;

import com.balatechdev.portfolio.common.exception.ResourceNotFoundException;
import com.balatechdev.portfolio.education.dto.EducationRequest;
import com.balatechdev.portfolio.education.dto.EducationResponse;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class EducationServiceTest {

    @Mock
    private EducationRepository repository;

    @InjectMocks
    private EducationService service;

    private Education sample;

    @BeforeEach
    void setUp() {
        sample = new Education("B.E CSE", "XYZ College", "2021 - 2025", "CGPA 7.8", null, "XY", 1);
    }

    @Test
    void findAll_returnsEntriesInDisplayOrder() {
        when(repository.findAllByOrderByDisplayOrderAsc()).thenReturn(List.of(sample));

        List<EducationResponse> result = service.findAll();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).title()).isEqualTo("B.E CSE");
    }

    @Test
    void findById_whenMissing_throwsNotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.findById(99L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("99");
    }

    @Test
    void create_savesWithDefaultDisplayOrderWhenNull() {
        EducationRequest request = new EducationRequest("Title", "School", "2024", null, null, null, null);
        when(repository.save(any(Education.class))).thenAnswer(invocation -> invocation.getArgument(0));

        EducationResponse response = service.create(request);

        assertThat(response.displayOrder()).isZero();
        verify(repository).save(any(Education.class));
    }

    @Test
    void delete_whenMissing_throwsNotFound() {
        when(repository.existsById(5L)).thenReturn(false);

        assertThatThrownBy(() -> service.delete(5L)).isInstanceOf(ResourceNotFoundException.class);
    }
}