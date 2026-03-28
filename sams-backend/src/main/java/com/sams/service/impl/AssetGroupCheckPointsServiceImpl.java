package com.sams.service.impl;

import com.sams.dto.AssetGroupCheckPointsDTO;
import com.sams.entity.AssetGroupCheckPoints;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetGroupCheckPointsRepository;
import com.sams.service.AssetGroupCheckPointsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetGroupCheckPointsServiceImpl implements AssetGroupCheckPointsService {

    private final AssetGroupCheckPointsRepository repository;

    @Override
    @Transactional
    public AssetGroupCheckPointsDTO create(AssetGroupCheckPointsDTO dto) {
        AssetGroupCheckPoints entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetGroupCheckPointsDTO getById(Long id) {
        AssetGroupCheckPoints entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetGroupCheckPoints not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetGroupCheckPointsDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetGroupCheckPointsDTO update(Long id, AssetGroupCheckPointsDTO dto) {
        AssetGroupCheckPoints entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetGroupCheckPoints not found with ID: " + id));
        AssetGroupCheckPoints mapped = mapToEntity(dto);
        mapped.setAssetGroupCheckPtsId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetGroupCheckPoints entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetGroupCheckPoints not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetGroupCheckPoints mapToEntity(AssetGroupCheckPointsDTO dto) {
        AssetGroupCheckPoints entity = new AssetGroupCheckPoints();
        entity.setAssetGroupCheckPtsId(dto.getAssetGroupCheckPtsId());
        entity.setOrgId(dto.getOrgId());
        entity.setAssetGroupId(dto.getAssetGroupId());
        entity.setParameterId(dto.getParameterId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private AssetGroupCheckPointsDTO mapToDTO(AssetGroupCheckPoints entity) {
        AssetGroupCheckPointsDTO dto = new AssetGroupCheckPointsDTO();
        dto.setAssetGroupCheckPtsId(entity.getAssetGroupCheckPtsId());
        dto.setOrgId(entity.getOrgId());
        dto.setAssetGroupId(entity.getAssetGroupId());
        dto.setParameterId(entity.getParameterId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}