package com.sams.service.impl;

import com.sams.dto.PriorityDTO;
import com.sams.entity.Priority;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PriorityRepository;
import com.sams.service.PriorityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PriorityServiceImpl implements PriorityService {

    private final PriorityRepository repository;

    @Override
    @Transactional
    public PriorityDTO createPriority(PriorityDTO dto) {
        Priority entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PriorityDTO getPriorityById(Long id) {
        Priority entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Priority not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PriorityDTO> getAllPriorities() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PriorityDTO updatePriority(Long id, PriorityDTO dto) {
        Priority entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Priority not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        Priority mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deletePriority(Long id) {
        Priority entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Priority not found with ID: " + id));
        repository.delete(entity);
    }

    private Priority mapToEntity(PriorityDTO dto) {
        Priority entity = new Priority();
        entity.setPriorityId(dto.getPriorityId());
        entity.setOrgId(dto.getOrgId());
        entity.setPriorityName(dto.getPriorityName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setOrgName(dto.getOrgName());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        return entity;
    }

    private PriorityDTO mapToDTO(Priority entity) {
        PriorityDTO dto = new PriorityDTO();
        dto.setId(entity.getId());
        dto.setPriorityId(entity.getPriorityId());
        dto.setOrgId(entity.getOrgId());
        dto.setPriorityName(entity.getPriorityName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setOrgName(entity.getOrgName());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        return dto;
    }
}