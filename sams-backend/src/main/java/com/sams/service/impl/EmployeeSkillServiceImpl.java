package com.sams.service.impl;

import com.sams.dto.EmployeeSkillDTO;
import com.sams.entity.EmployeeSkill;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EmployeeSkillRepository;
import com.sams.service.EmployeeSkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeSkillServiceImpl implements EmployeeSkillService {

    private final EmployeeSkillRepository repository;

    @Override
    @Transactional
    public EmployeeSkillDTO create(EmployeeSkillDTO dto) {
        EmployeeSkill entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EmployeeSkillDTO getById(Long id) {
        EmployeeSkill entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmployeeSkill not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EmployeeSkillDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmployeeSkillDTO update(Long id, EmployeeSkillDTO dto) {
        EmployeeSkill entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmployeeSkill not found with ID: " + id));
        EmployeeSkill mapped = mapToEntity(dto);
        mapped.setEmployeeSkillId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        EmployeeSkill entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmployeeSkill not found with ID: " + id));
        repository.delete(entity);
    }

    private EmployeeSkill mapToEntity(EmployeeSkillDTO dto) {
        EmployeeSkill entity = new EmployeeSkill();
        entity.setEmployeeSkillId(dto.getEmployeeSkillId());
        entity.setEmployeeId(dto.getEmployeeId());
        entity.setSkillName(dto.getSkillName());
        entity.setNoOfYears(dto.getNoOfYears());
        entity.setRemarks(dto.getRemarks());
        entity.setLevel(dto.getLevel());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private EmployeeSkillDTO mapToDTO(EmployeeSkill entity) {
        EmployeeSkillDTO dto = new EmployeeSkillDTO();
        dto.setEmployeeSkillId(entity.getEmployeeSkillId());
        dto.setEmployeeId(entity.getEmployeeId());
        dto.setSkillName(entity.getSkillName());
        dto.setNoOfYears(entity.getNoOfYears());
        dto.setRemarks(entity.getRemarks());
        dto.setLevel(entity.getLevel());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}