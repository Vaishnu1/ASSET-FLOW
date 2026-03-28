package com.sams.service.impl;

import com.sams.dto.Attribute5DTO;
import com.sams.entity.Attribute5;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.Attribute5Repository;
import com.sams.service.Attribute5Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class Attribute5ServiceImpl implements Attribute5Service {

    private final Attribute5Repository repository;

    @Override
    @Transactional
    public Attribute5DTO createAttribute5(Attribute5DTO dto) {
        Attribute5 entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public Attribute5DTO getAttribute5ById(Long id) {
        Attribute5 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Attribute5 not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<Attribute5DTO> getAllAttribute5s() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Attribute5DTO updateAttribute5(Long id, Attribute5DTO dto) {
        Attribute5 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Attribute5 not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        Attribute5 mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteAttribute5(Long id) {
        Attribute5 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Attribute5 not found with ID: " + id));
        repository.delete(entity);
    }

    private Attribute5 mapToEntity(Attribute5DTO dto) {
        Attribute5 entity = new Attribute5();
        entity.setSrAttributeId5(dto.getSrAttributeId5());
        entity.setOrgId(dto.getOrgId());
        entity.setAttribute5Name(dto.getAttribute5Name());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setOrgName(dto.getOrgName());
        return entity;
    }

    private Attribute5DTO mapToDTO(Attribute5 entity) {
        Attribute5DTO dto = new Attribute5DTO();
        dto.setId(entity.getId());
        dto.setSrAttributeId5(entity.getSrAttributeId5());
        dto.setOrgId(entity.getOrgId());
        dto.setAttribute5Name(entity.getAttribute5Name());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setOrgName(entity.getOrgName());
        return dto;
    }
}