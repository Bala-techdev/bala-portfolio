package com.balatechdev.portfolio.education;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.balatechdev.portfolio.common.exception.ResourceNotFoundException;
import com.balatechdev.portfolio.education.dto.EducationResponse;
import java.time.Instant;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(EducationController.class)
@ActiveProfiles("test")
class EducationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private EducationService service;

    @Test
    void getAll_isPublic_andReturnsJson() throws Exception {
        given(service.findAll()).willReturn(List.of(
                new EducationResponse(1L, "B.E CSE", "XYZ College", "2021 - 2025", "CGPA 7.8",
                        null, "XY", 1, Instant.now(), Instant.now())));

        mockMvc.perform(get("/api/v1/education"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].title").value("B.E CSE"));
    }

    @Test
    void getOne_whenMissing_returns404WithProblemDetail() throws Exception {
        given(service.findById(anyLong())).willThrow(new ResourceNotFoundException("Education", 99L));

        mockMvc.perform(get("/api/v1/education/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title").value("Resource not found"));
    }
}