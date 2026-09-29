package com.balatechdev.portfolio.skill;

import com.balatechdev.portfolio.common.exception.ResourceNotFoundException;
import com.balatechdev.portfolio.skill.dto.SkillGroupRequest;
import com.balatechdev.portfolio.skill.dto.SkillGroupResponse;
import com.balatechdev.portfolio.skill.dto.SkillMapper;
import com.balatechdev.portfolio.skill.dto.SkillRequest;
import com.balatechdev.portfolio.skill.dto.SkillResponse;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class SkillService {

    private static final int DEFAULT_SPAN = 3;

    private final SkillGroupRepository groupRepository;
    private final SkillRepository skillRepository;

    public SkillService(SkillGroupRepository groupRepository, SkillRepository skillRepository) {
        this.groupRepository = groupRepository;
        this.skillRepository = skillRepository;
    }

    // ---------- Groups ----------

    public List<SkillGroupResponse> findAllGroups() {
        return groupRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(SkillMapper::toGroupResponse)
                .toList();
    }

    @Transactional
    public SkillGroupResponse createGroup(SkillGroupRequest request) {
        SkillGroup group = new SkillGroup(
                request.title(),
                request.span() != null ? request.span() : DEFAULT_SPAN,
                request.displayOrder() != null ? request.displayOrder() : 0);
        return SkillMapper.toGroupResponse(groupRepository.save(group));
    }

    @Transactional
    public SkillGroupResponse updateGroup(Long id, SkillGroupRequest request) {
        SkillGroup group = getGroupOrThrow(id);
        group.update(
                request.title(),
                request.span() != null ? request.span() : group.getSpan(),
                request.displayOrder() != null ? request.displayOrder() : group.getDisplayOrder());
        return SkillMapper.toGroupResponse(group);
    }

    @Transactional
    public void deleteGroup(Long id) {
        // findById + delete (instead of deleteById) so Hibernate cascades to the skills
        groupRepository.delete(getGroupOrThrow(id));
    }

    // ---------- Skills ----------

    @Transactional
    public SkillResponse addSkill(Long groupId, SkillRequest request) {
        SkillGroup group = getGroupOrThrow(groupId);
        Skill skill = new Skill(
                group,
                request.name(),
                request.icon(),
                request.abbr(),
                request.displayOrder() != null ? request.displayOrder() : 0);
        return SkillMapper.toSkillResponse(skillRepository.save(skill));
    }

    @Transactional
    public SkillResponse updateSkill(Long id, SkillRequest request) {
        Skill skill = getSkillOrThrow(id);
        skill.update(
                request.name(),
                request.icon(),
                request.abbr(),
                request.displayOrder() != null ? request.displayOrder() : skill.getDisplayOrder());
        return SkillMapper.toSkillResponse(skill);
    }

    @Transactional
    public void deleteSkill(Long id) {
        skillRepository.delete(getSkillOrThrow(id));
    }

    private SkillGroup getGroupOrThrow(Long id) {
        return groupRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill group", id));
    }

    private Skill getSkillOrThrow(Long id) {
        return skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill", id));
    }
}