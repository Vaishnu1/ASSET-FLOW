package com.sams.service.impl;

import com.sams.dto.AssetCheckPointsDTO;
import com.sams.entity.AssetCheckPoints;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetCheckPointsRepository;
import com.sams.service.AssetCheckPointsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetCheckPointsServiceImpl implements AssetCheckPointsService {

    private final AssetCheckPointsRepository repository;

    @Override
    @Transactional
    public AssetCheckPointsDTO create(AssetCheckPointsDTO dto) {
        AssetCheckPoints entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetCheckPointsDTO getById(Long id) {
        AssetCheckPoints entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCheckPoints not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetCheckPointsDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetCheckPointsDTO update(Long id, AssetCheckPointsDTO dto) {
        AssetCheckPoints entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCheckPoints not found with ID: " + id));
        AssetCheckPoints mapped = mapToEntity(dto);
        mapped.setAssetCheckPtsId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetCheckPoints entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCheckPoints not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetCheckPoints mapToEntity(AssetCheckPointsDTO dto) {
        AssetCheckPoints entity = new AssetCheckPoints();
        entity.setAssetCheckPtsId(dto.getAssetCheckPtsId());
        entity.setOrgId(dto.getOrgId());
        entity.setAssetId(dto.getAssetId());
        entity.setParameterTypeId(dto.getParameterTypeId());
        entity.setParameterType(dto.getParameterType());
        entity.setParameterId(dto.getParameterId());
        entity.setParameterName(dto.getParameterName());
        entity.setParameterGroupId(dto.getParameterGroupId());
        entity.setParameterGroupName(dto.getParameterGroupName());
        entity.setUsedFor(dto.getUsedFor());
        entity.setStartValue(dto.getStartValue());
        entity.setEndValue(dto.getEndValue());
        entity.setUom(dto.getUom());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private AssetCheckPointsDTO mapToDTO(AssetCheckPoints entity) {
        AssetCheckPointsDTO dto = new AssetCheckPointsDTO();
        dto.setAssetCheckPtsId(entity.getAssetCheckPtsId());
        dto.setOrgId(entity.getOrgId());
        dto.setAssetId(entity.getAssetId());
        dto.setParameterTypeId(entity.getParameterTypeId());
        dto.setParameterType(entity.getParameterType());
        dto.setParameterId(entity.getParameterId());
        dto.setParameterName(entity.getParameterName());
        dto.setParameterGroupId(entity.getParameterGroupId());
        dto.setParameterGroupName(entity.getParameterGroupName());
        dto.setUsedFor(entity.getUsedFor());
        dto.setStartValue(entity.getStartValue());
        dto.setEndValue(entity.getEndValue());
        dto.setUom(entity.getUom());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}