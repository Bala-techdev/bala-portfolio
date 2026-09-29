package com.balatechdev.portfolio.skill;

import com.balatechdev.portfolio.skill.dto.SkillGroupRequest;
import com.balatechdev.portfolio.skill.dto.SkillGroupResponse;
import com.balatechdev.portfolio.skill.dto.SkillRequest;
import com.balatechdev.portfolio.skill.dto.SkillResponse;
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
@RequestMapping("/api/v1/admin")
public class AdminSkillController {

    private final SkillService service;

    public AdminSkillController(SkillService service) {
        this.service = service;
    }

    // ---------- Groups ----------

    @PostMapping("/skill-groups")
    @ResponseStatus(HttpStatus.CREATED)
    public SkillGroupResponse createGroup(@Valid @RequestBody SkillGroupRequest request) {
        return service.createGroup(request);
    }

    @PutMapping("/skill-groups/{id}")
    public SkillGroupResponse updateGroup(@PathVariable Long id, @Valid @RequestBody SkillGroupRequest request) {
        return service.updateGroup(id, request);
    }

    @DeleteMapping("/skill-groups/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long id) {
        service.deleteGroup(id);
        return ResponseEntity.noContent().build();
    }

    // ---------- Skills inside a group ----------

    @PostMapping("/skill-groups/{groupId}/skills")
    @ResponseStatus(HttpStatus.CREATED)
    public SkillResponse addSkill(@PathVariable Long groupId, @Valid @RequestBody SkillRequest request) {
        return service.addSkill(groupId, request);
    }

    @PutMapping("/skills/{id}")
    public SkillResponse updateSkill(@PathVariable Long id, @Valid @RequestBody SkillRequest request) {
        return service.updateSkill(id, request);
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        service.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }
}