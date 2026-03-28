package com.sams.service.impl;

import com.sams.dto.SrAttribute5DTO;
import com.sams.entity.SrAttribute5;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrAttribute5Repository;
import com.sams.service.SrAttribute5Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrAttribute5ServiceImpl implements SrAttribute5Service {

    private final SrAttribute5Repository repository;

    @Override
    @Transactional
    public SrAttribute5DTO create(SrAttribute5DTO dto) {
        SrAttribute5 entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrAttribute5DTO getById(Long id) {
        SrAttribute5 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrAttribute5 not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrAttribute5DTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrAttribute5DTO update(Long id, SrAttribute5DTO dto) {
        SrAttribute5 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrAttribute5 not found with ID: " + id));
        SrAttribute5 mapped = mapToEntity(dto);
        mapped.setSrAttributeId5(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrAttribute5 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrAttribute5 not found with ID: " + id));
        repository.delete(entity);
    }

    private SrAttribute5 mapToEntity(SrAttribute5DTO dto) {
        SrAttribute5 entity = new SrAttribute5();
        entity.setSrAttributeId5(dto.getSrAttributeId5());
        entity.setOrgId(dto.getOrgId());
        entity.setAttribute5Name(dto.getAttribute5Name());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SrAttribute5DTO mapToDTO(SrAttribute5 entity) {
        SrAttribute5DTO dto = new SrAttribute5DTO();
        dto.setSrAttributeId5(entity.getSrAttributeId5());
        dto.setOrgId(entity.getOrgId());
        dto.setAttribute5Name(entity.getAttribute5Name());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}