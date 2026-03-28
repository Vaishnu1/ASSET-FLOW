package com.sams.service.impl;

import com.sams.dto.ModelAuditDTO;
import com.sams.entity.ModelAudit;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ModelAuditRepository;
import com.sams.service.ModelAuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModelAuditServiceImpl implements ModelAuditService {

    private final ModelAuditRepository repository;

    @Override
    @Transactional
    public ModelAuditDTO create(ModelAuditDTO dto) {
        ModelAudit entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ModelAuditDTO getById(Long id) {
        ModelAudit entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelAudit not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ModelAuditDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ModelAuditDTO update(Long id, ModelAuditDTO dto) {
        ModelAudit entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelAudit not found with ID: " + id));
        ModelAudit mapped = mapToEntity(dto);
        mapped.setModelId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ModelAudit entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelAudit not found with ID: " + id));
        repository.delete(entity);
    }

    private ModelAudit mapToEntity(ModelAuditDTO dto) {
        ModelAudit entity = new ModelAudit();
        entity.setModelId(dto.getModelId());
        entity.setMode(dto.getMode());
        entity.setOrgId(dto.getOrgId());
        entity.setModelNo(dto.getModelNo());
        entity.setModelName(dto.getModelName());
        entity.setBusinessPartnerId(dto.getBusinessPartnerId());
        entity.setAssetSubCategoryId(dto.getAssetSubCategoryId());
        entity.setAssetCategoryId(dto.getAssetCategoryId());
        entity.setAssetTypeId(dto.getAssetTypeId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ModelAuditDTO mapToDTO(ModelAudit entity) {
        ModelAuditDTO dto = new ModelAuditDTO();
        dto.setModelId(entity.getModelId());
        dto.setMode(entity.getMode());
        dto.setOrgId(entity.getOrgId());
        dto.setModelNo(entity.getModelNo());
        dto.setModelName(entity.getModelName());
        dto.setBusinessPartnerId(entity.getBusinessPartnerId());
        dto.setAssetSubCategoryId(entity.getAssetSubCategoryId());
        dto.setAssetCategoryId(entity.getAssetCategoryId());
        dto.setAssetTypeId(entity.getAssetTypeId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}