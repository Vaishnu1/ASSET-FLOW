package com.sams.service.impl;

import com.sams.dto.SupplierModelSuppliedDTO;
import com.sams.entity.SupplierModelSupplied;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SupplierModelSuppliedRepository;
import com.sams.service.SupplierModelSuppliedService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierModelSuppliedServiceImpl implements SupplierModelSuppliedService {

    private final SupplierModelSuppliedRepository repository;

    @Override
    @Transactional
    public SupplierModelSuppliedDTO createSupplierModelSupplied(SupplierModelSuppliedDTO dto) {
        SupplierModelSupplied entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SupplierModelSuppliedDTO getSupplierModelSuppliedById(Long id) {
        SupplierModelSupplied entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierModelSupplied not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SupplierModelSuppliedDTO> getAllSupplierModelSupplieds() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SupplierModelSuppliedDTO updateSupplierModelSupplied(Long id, SupplierModelSuppliedDTO dto) {
        SupplierModelSupplied entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierModelSupplied not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        SupplierModelSupplied mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteSupplierModelSupplied(Long id) {
        SupplierModelSupplied entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierModelSupplied not found with ID: " + id));
        repository.delete(entity);
    }

    private SupplierModelSupplied mapToEntity(SupplierModelSuppliedDTO dto) {
        SupplierModelSupplied entity = new SupplierModelSupplied();
        entity.setAssetSuppliedId(dto.getAssetSuppliedId());
        entity.setSupplierId(dto.getSupplierId());
        entity.setOrgId(dto.getOrgId());
        entity.setManufacturerId(dto.getManufacturerId());
        entity.setManufacturerName(dto.getManufacturerName());
        entity.setAssetGroupId(dto.getAssetGroupId());
        entity.setAssetGroupName(dto.getAssetGroupName());
        entity.setModelId(dto.getModelId());
        entity.setModelName(dto.getModelName());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDt(dto.getUpdatedDtDt());
        return entity;
    }

    private SupplierModelSuppliedDTO mapToDTO(SupplierModelSupplied entity) {
        SupplierModelSuppliedDTO dto = new SupplierModelSuppliedDTO();
        dto.setId(entity.getId());
        dto.setAssetSuppliedId(entity.getAssetSuppliedId());
        dto.setSupplierId(entity.getSupplierId());
        dto.setOrgId(entity.getOrgId());
        dto.setManufacturerId(entity.getManufacturerId());
        dto.setManufacturerName(entity.getManufacturerName());
        dto.setAssetGroupId(entity.getAssetGroupId());
        dto.setAssetGroupName(entity.getAssetGroupName());
        dto.setModelId(entity.getModelId());
        dto.setModelName(entity.getModelName());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDt(entity.getUpdatedDtDt());
        return dto;
    }
}