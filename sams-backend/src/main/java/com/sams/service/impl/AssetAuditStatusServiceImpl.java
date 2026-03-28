package com.sams.service.impl;

import com.sams.dto.AssetAuditStatusDTO;
import com.sams.entity.AssetAuditStatus;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetAuditStatusRepository;
import com.sams.service.AssetAuditStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetAuditStatusServiceImpl implements AssetAuditStatusService {

    private final AssetAuditStatusRepository repository;

    @Override
    @Transactional
    public AssetAuditStatusDTO create(AssetAuditStatusDTO dto) {
        AssetAuditStatus entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetAuditStatusDTO getById(Long id) {
        AssetAuditStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetAuditStatus not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetAuditStatusDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetAuditStatusDTO update(Long id, AssetAuditStatusDTO dto) {
        AssetAuditStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetAuditStatus not found with ID: " + id));
        AssetAuditStatus mapped = mapToEntity(dto);
        mapped.setAssetAuditStatusId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetAuditStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetAuditStatus not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetAuditStatus mapToEntity(AssetAuditStatusDTO dto) {
        AssetAuditStatus entity = new AssetAuditStatus();
        entity.setAssetAuditStatusId(dto.getAssetAuditStatusId());
        entity.setDisplaySequenceOrder(dto.getDisplaySequenceOrder());
        entity.setAssetAuditStatusName(dto.getAssetAuditStatusName());
        entity.setAssetAuditStatusDesc(dto.getAssetAuditStatusDesc());
        entity.setActive(dto.getActive());
        entity.setCreateBy(dto.getCreateBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private AssetAuditStatusDTO mapToDTO(AssetAuditStatus entity) {
        AssetAuditStatusDTO dto = new AssetAuditStatusDTO();
        dto.setAssetAuditStatusId(entity.getAssetAuditStatusId());
        dto.setDisplaySequenceOrder(entity.getDisplaySequenceOrder());
        dto.setAssetAuditStatusName(entity.getAssetAuditStatusName());
        dto.setAssetAuditStatusDesc(entity.getAssetAuditStatusDesc());
        dto.setActive(entity.getActive());
        dto.setCreateBy(entity.getCreateBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}