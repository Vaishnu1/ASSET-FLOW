package com.sams.service.impl;

import com.sams.dto.CoverageTypeDTO;
import com.sams.entity.CoverageType;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.CoverageTypeRepository;
import com.sams.service.CoverageTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CoverageTypeServiceImpl implements CoverageTypeService {

    private final CoverageTypeRepository repository;

    @Override
    @Transactional
    public CoverageTypeDTO create(CoverageTypeDTO dto) {
        CoverageType entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public CoverageTypeDTO getById(Long id) {
        CoverageType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CoverageType not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<CoverageTypeDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CoverageTypeDTO update(Long id, CoverageTypeDTO dto) {
        CoverageType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CoverageType not found with ID: " + id));
        CoverageType mapped = mapToEntity(dto);
        mapped.setCoverageTypeId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        CoverageType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CoverageType not found with ID: " + id));
        repository.delete(entity);
    }

    private CoverageType mapToEntity(CoverageTypeDTO dto) {
        CoverageType entity = new CoverageType();
        entity.setCoverageTypeId(dto.getCoverageTypeId());
        entity.setOrgId(dto.getOrgId());
        entity.setCoverageTypeName(dto.getCoverageTypeName());
        entity.setCoverageTypeDesc(dto.getCoverageTypeDesc());
        entity.setCoverageFor(dto.getCoverageFor());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private CoverageTypeDTO mapToDTO(CoverageType entity) {
        CoverageTypeDTO dto = new CoverageTypeDTO();
        dto.setCoverageTypeId(entity.getCoverageTypeId());
        dto.setOrgId(entity.getOrgId());
        dto.setCoverageTypeName(entity.getCoverageTypeName());
        dto.setCoverageTypeDesc(entity.getCoverageTypeDesc());
        dto.setCoverageFor(entity.getCoverageFor());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}