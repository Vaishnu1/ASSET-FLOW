package com.sams.service.impl;

import com.sams.dto.RetirementReasonsDTO;
import com.sams.entity.RetirementReasons;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.RetirementReasonsRepository;
import com.sams.service.RetirementReasonsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RetirementReasonsServiceImpl implements RetirementReasonsService {

    private final RetirementReasonsRepository repository;

    @Override
    @Transactional
    public RetirementReasonsDTO create(RetirementReasonsDTO dto) {
        RetirementReasons entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public RetirementReasonsDTO getById(Long id) {
        RetirementReasons entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RetirementReasons not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<RetirementReasonsDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RetirementReasonsDTO update(Long id, RetirementReasonsDTO dto) {
        RetirementReasons entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RetirementReasons not found with ID: " + id));
        RetirementReasons mapped = mapToEntity(dto);
        mapped.setRetirementReasonsId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        RetirementReasons entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RetirementReasons not found with ID: " + id));
        repository.delete(entity);
    }

    private RetirementReasons mapToEntity(RetirementReasonsDTO dto) {
        RetirementReasons entity = new RetirementReasons();
        entity.setRetirementReasonsId(dto.getRetirementReasonsId());
        entity.setOrgId(dto.getOrgId());
        entity.setRetirementReasonName(dto.getRetirementReasonName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private RetirementReasonsDTO mapToDTO(RetirementReasons entity) {
        RetirementReasonsDTO dto = new RetirementReasonsDTO();
        dto.setRetirementReasonsId(entity.getRetirementReasonsId());
        dto.setOrgId(entity.getOrgId());
        dto.setRetirementReasonName(entity.getRetirementReasonName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}