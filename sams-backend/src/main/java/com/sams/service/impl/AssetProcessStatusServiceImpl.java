package com.sams.service.impl;

import com.sams.dto.AssetProcessStatusDTO;
import com.sams.entity.AssetProcessStatus;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetProcessStatusRepository;
import com.sams.service.AssetProcessStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetProcessStatusServiceImpl implements AssetProcessStatusService {

    private final AssetProcessStatusRepository repository;

    @Override
    @Transactional
    public AssetProcessStatusDTO create(AssetProcessStatusDTO dto) {
        AssetProcessStatus entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetProcessStatusDTO getById(Long id) {
        AssetProcessStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetProcessStatus not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetProcessStatusDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetProcessStatusDTO update(Long id, AssetProcessStatusDTO dto) {
        AssetProcessStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetProcessStatus not found with ID: " + id));
        AssetProcessStatus mapped = mapToEntity(dto);
        mapped.setAssetProcessStatusId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetProcessStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetProcessStatus not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetProcessStatus mapToEntity(AssetProcessStatusDTO dto) {
        AssetProcessStatus entity = new AssetProcessStatus();
        entity.setAssetProcessStatusId(dto.getAssetProcessStatusId());
        entity.setAssetId(dto.getAssetId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setProcessId(dto.getProcessId());
        entity.setProcessStatusId(dto.getProcessStatusId());
        entity.setTransactionId(dto.getTransactionId());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private AssetProcessStatusDTO mapToDTO(AssetProcessStatus entity) {
        AssetProcessStatusDTO dto = new AssetProcessStatusDTO();
        dto.setAssetProcessStatusId(entity.getAssetProcessStatusId());
        dto.setAssetId(entity.getAssetId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setProcessId(entity.getProcessId());
        dto.setProcessStatusId(entity.getProcessStatusId());
        dto.setTransactionId(entity.getTransactionId());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}