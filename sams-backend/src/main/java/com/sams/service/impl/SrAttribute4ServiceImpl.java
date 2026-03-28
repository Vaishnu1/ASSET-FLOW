package com.sams.service.impl;

import com.sams.dto.SrAttribute4DTO;
import com.sams.entity.SrAttribute4;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrAttribute4Repository;
import com.sams.service.SrAttribute4Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrAttribute4ServiceImpl implements SrAttribute4Service {

    private final SrAttribute4Repository repository;

    @Override
    @Transactional
    public SrAttribute4DTO create(SrAttribute4DTO dto) {
        SrAttribute4 entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrAttribute4DTO getById(Long id) {
        SrAttribute4 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrAttribute4 not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrAttribute4DTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrAttribute4DTO update(Long id, SrAttribute4DTO dto) {
        SrAttribute4 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrAttribute4 not found with ID: " + id));
        SrAttribute4 mapped = mapToEntity(dto);
        mapped.setSrAttributeId4(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrAttribute4 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrAttribute4 not found with ID: " + id));
        repository.delete(entity);
    }

    private SrAttribute4 mapToEntity(SrAttribute4DTO dto) {
        SrAttribute4 entity = new SrAttribute4();
        entity.setSrAttributeId4(dto.getSrAttributeId4());
        entity.setOrgId(dto.getOrgId());
        entity.setAttribute4Name(dto.getAttribute4Name());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SrAttribute4DTO mapToDTO(SrAttribute4 entity) {
        SrAttribute4DTO dto = new SrAttribute4DTO();
        dto.setSrAttributeId4(entity.getSrAttributeId4());
        dto.setOrgId(entity.getOrgId());
        dto.setAttribute4Name(entity.getAttribute4Name());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}