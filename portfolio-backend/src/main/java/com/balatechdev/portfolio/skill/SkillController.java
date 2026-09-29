package com.balatechdev.portfolio.skill;

import com.balatechdev.portfolio.skill.dto.SkillGroupResponse;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/skills")
public class SkillController {

    private final SkillService service;

    public SkillController(SkillService service) {
        this.service = service;
    }

    // Returns every group with its skills nested inside
    @GetMapping
    public List<SkillGroupResponse> getAll() {
        return service.findAllGroups();
    }
}