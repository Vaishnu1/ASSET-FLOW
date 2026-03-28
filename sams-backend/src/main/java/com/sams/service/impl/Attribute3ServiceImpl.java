package com.sams.service.impl;

import com.sams.dto.Attribute3DTO;
import com.sams.entity.Attribute3;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.Attribute3Repository;
import com.sams.service.Attribute3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class Attribute3ServiceImpl implements Attribute3Service {

    private final Attribute3Repository repository;

    @Override
    @Transactional
    public Attribute3DTO createAttribute3(Attribute3DTO dto) {
        Attribute3 entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public Attribute3DTO getAttribute3ById(Long id) {
        Attribute3 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Attribute3 not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<Attribute3DTO> getAllAttribute3s() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Attribute3DTO updateAttribute3(Long id, Attribute3DTO dto) {
        Attribute3 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Attribute3 not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        Attribute3 mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteAttribute3(Long id) {
        Attribute3 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Attribute3 not found with ID: " + id));
        repository.delete(entity);
    }

    private Attribute3 mapToEntity(Attribute3DTO dto) {
        Attribute3 entity = new Attribute3();
        entity.setSrAttributeId3(dto.getSrAttributeId3());
        entity.setOrgId(dto.getOrgId());
        entity.setAttribute3Name(dto.getAttribute3Name());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setOrgName(dto.getOrgName());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        return entity;
    }

    private Attribute3DTO mapToDTO(Attribute3 entity) {
        Attribute3DTO dto = new Attribute3DTO();
        dto.setId(entity.getId());
        dto.setSrAttributeId3(entity.getSrAttributeId3());
        dto.setOrgId(entity.getOrgId());
        dto.setAttribute3Name(entity.getAttribute3Name());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setOrgName(entity.getOrgName());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        return dto;
    }
}