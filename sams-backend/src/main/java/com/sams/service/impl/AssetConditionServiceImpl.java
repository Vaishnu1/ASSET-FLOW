package com.sams.service.impl;

import com.sams.dto.AssetConditionDTO;
import com.sams.entity.AssetCondition;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetConditionRepository;
import com.sams.service.AssetConditionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetConditionServiceImpl implements AssetConditionService {

    private final AssetConditionRepository repository;

    @Override
    @Transactional
    public AssetConditionDTO create(AssetConditionDTO dto) {
        AssetCondition entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetConditionDTO getById(Long id) {
        AssetCondition entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCondition not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetConditionDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetConditionDTO update(Long id, AssetConditionDTO dto) {
        AssetCondition entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCondition not found with ID: " + id));
        AssetCondition mapped = mapToEntity(dto);
        mapped.setAssetConditionId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetCondition entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCondition not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetCondition mapToEntity(AssetConditionDTO dto) {
        AssetCondition entity = new AssetCondition();
        entity.setAssetConditionId(dto.getAssetConditionId());
        entity.setAssetConditionName(dto.getAssetConditionName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setAssetStatusId(dto.getAssetStatusId());
        entity.setAssetConditionDesc(dto.getAssetConditionDesc());
        return entity;
    }

    private AssetConditionDTO mapToDTO(AssetCondition entity) {
        AssetConditionDTO dto = new AssetConditionDTO();
        dto.setAssetConditionId(entity.getAssetConditionId());
        dto.setAssetConditionName(entity.getAssetConditionName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setAssetStatusId(entity.getAssetStatusId());
        dto.setAssetConditionDesc(entity.getAssetConditionDesc());
        return dto;
    }
}