package com.sams.service.impl;

import com.sams.dto.Attribute4DTO;
import com.sams.entity.Attribute4;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.Attribute4Repository;
import com.sams.service.Attribute4Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class Attribute4ServiceImpl implements Attribute4Service {

    private final Attribute4Repository repository;

    @Override
    @Transactional
    public Attribute4DTO createAttribute4(Attribute4DTO dto) {
        Attribute4 entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public Attribute4DTO getAttribute4ById(Long id) {
        Attribute4 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Attribute4 not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<Attribute4DTO> getAllAttribute4s() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Attribute4DTO updateAttribute4(Long id, Attribute4DTO dto) {
        Attribute4 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Attribute4 not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        Attribute4 mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteAttribute4(Long id) {
        Attribute4 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Attribute4 not found with ID: " + id));
        repository.delete(entity);
    }

    private Attribute4 mapToEntity(Attribute4DTO dto) {
        Attribute4 entity = new Attribute4();
        entity.setSrAttributeId4(dto.getSrAttributeId4());
        entity.setOrgId(dto.getOrgId());
        entity.setAttribute4Name(dto.getAttribute4Name());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setOrgName(dto.getOrgName());
        return entity;
    }

    private Attribute4DTO mapToDTO(Attribute4 entity) {
        Attribute4DTO dto = new Attribute4DTO();
        dto.setId(entity.getId());
        dto.setSrAttributeId4(entity.getSrAttributeId4());
        dto.setOrgId(entity.getOrgId());
        dto.setAttribute4Name(entity.getAttribute4Name());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setOrgName(entity.getOrgName());
        return dto;
    }
}