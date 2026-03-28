package com.sams.service.impl;

import com.sams.dto.AssigneeTypeDTO;
import com.sams.entity.AssigneeType;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssigneeTypeRepository;
import com.sams.service.AssigneeTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssigneeTypeServiceImpl implements AssigneeTypeService {

    private final AssigneeTypeRepository repository;

    @Override
    @Transactional
    public AssigneeTypeDTO create(AssigneeTypeDTO dto) {
        AssigneeType entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssigneeTypeDTO getById(Long id) {
        AssigneeType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssigneeType not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssigneeTypeDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssigneeTypeDTO update(Long id, AssigneeTypeDTO dto) {
        AssigneeType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssigneeType not found with ID: " + id));
        AssigneeType mapped = mapToEntity(dto);
        mapped.setAssigneeTypeId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssigneeType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssigneeType not found with ID: " + id));
        repository.delete(entity);
    }

    private AssigneeType mapToEntity(AssigneeTypeDTO dto) {
        AssigneeType entity = new AssigneeType();
        entity.setAssigneeTypeId(dto.getAssigneeTypeId());
        entity.setOrgId(dto.getOrgId());
        entity.setAssigneeType(dto.getAssigneeType());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        return entity;
    }

    private AssigneeTypeDTO mapToDTO(AssigneeType entity) {
        AssigneeTypeDTO dto = new AssigneeTypeDTO();
        dto.setAssigneeTypeId(entity.getAssigneeTypeId());
        dto.setOrgId(entity.getOrgId());
        dto.setAssigneeType(entity.getAssigneeType());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        return dto;
    }
}