package com.sams.service.impl;

import com.sams.dto.PreInwChildAssetDTO;
import com.sams.entity.PreInwChildAsset;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PreInwChildAssetRepository;
import com.sams.service.PreInwChildAssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PreInwChildAssetServiceImpl implements PreInwChildAssetService {

    private final PreInwChildAssetRepository repository;

    @Override
    @Transactional
    public PreInwChildAssetDTO create(PreInwChildAssetDTO dto) {
        PreInwChildAsset entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PreInwChildAssetDTO getById(Long id) {
        PreInwChildAsset entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PreInwChildAsset not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PreInwChildAssetDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PreInwChildAssetDTO update(Long id, PreInwChildAssetDTO dto) {
        PreInwChildAsset entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PreInwChildAsset not found with ID: " + id));
        PreInwChildAsset mapped = mapToEntity(dto);
        mapped.setPreInwChildAssetId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PreInwChildAsset entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PreInwChildAsset not found with ID: " + id));
        repository.delete(entity);
    }

    private PreInwChildAsset mapToEntity(PreInwChildAssetDTO dto) {
        PreInwChildAsset entity = new PreInwChildAsset();
        entity.setPreInwChildAssetId(dto.getPreInwChildAssetId());
        entity.setInwardInventoryDtlId(dto.getInwardInventoryDtlId());
        entity.setBusinessPartnerId(dto.getBusinessPartnerId());
        entity.setBusinessPartnerName(dto.getBusinessPartnerName());
        entity.setModelId(dto.getModelId());
        entity.setModelName(dto.getModelName());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private PreInwChildAssetDTO mapToDTO(PreInwChildAsset entity) {
        PreInwChildAssetDTO dto = new PreInwChildAssetDTO();
        dto.setPreInwChildAssetId(entity.getPreInwChildAssetId());
        dto.setInwardInventoryDtlId(entity.getInwardInventoryDtlId());
        dto.setBusinessPartnerId(entity.getBusinessPartnerId());
        dto.setBusinessPartnerName(entity.getBusinessPartnerName());
        dto.setModelId(entity.getModelId());
        dto.setModelName(entity.getModelName());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}