package com.sams.service.impl;

import com.sams.dto.SrAttribute3DTO;
import com.sams.entity.SrAttribute3;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrAttribute3Repository;
import com.sams.service.SrAttribute3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrAttribute3ServiceImpl implements SrAttribute3Service {

    private final SrAttribute3Repository repository;

    @Override
    @Transactional
    public SrAttribute3DTO create(SrAttribute3DTO dto) {
        SrAttribute3 entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrAttribute3DTO getById(Long id) {
        SrAttribute3 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrAttribute3 not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrAttribute3DTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrAttribute3DTO update(Long id, SrAttribute3DTO dto) {
        SrAttribute3 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrAttribute3 not found with ID: " + id));
        SrAttribute3 mapped = mapToEntity(dto);
        mapped.setSrAttributeId3(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrAttribute3 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrAttribute3 not found with ID: " + id));
        repository.delete(entity);
    }

    private SrAttribute3 mapToEntity(SrAttribute3DTO dto) {
        SrAttribute3 entity = new SrAttribute3();
        entity.setSrAttributeId3(dto.getSrAttributeId3());
        entity.setOrgId(dto.getOrgId());
        entity.setAttribute3Name(dto.getAttribute3Name());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SrAttribute3DTO mapToDTO(SrAttribute3 entity) {
        SrAttribute3DTO dto = new SrAttribute3DTO();
        dto.setSrAttributeId3(entity.getSrAttributeId3());
        dto.setOrgId(entity.getOrgId());
        dto.setAttribute3Name(entity.getAttribute3Name());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}