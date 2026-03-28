package com.sams.service.impl;

import com.sams.dto.ChildAssetDTO;
import com.sams.entity.ChildAsset;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ChildAssetRepository;
import com.sams.service.ChildAssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChildAssetServiceImpl implements ChildAssetService {

    private final ChildAssetRepository repository;

    @Override
    @Transactional
    public ChildAssetDTO create(ChildAssetDTO dto) {
        ChildAsset entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ChildAssetDTO getById(Long id) {
        ChildAsset entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ChildAsset not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ChildAssetDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ChildAssetDTO update(Long id, ChildAssetDTO dto) {
        ChildAsset entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ChildAsset not found with ID: " + id));
        ChildAsset mapped = mapToEntity(dto);
        mapped.setChildAssetId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ChildAsset entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ChildAsset not found with ID: " + id));
        repository.delete(entity);
    }

    private ChildAsset mapToEntity(ChildAssetDTO dto) {
        ChildAsset entity = new ChildAsset();
        entity.setChildAssetId(dto.getChildAssetId());
        entity.setOrgId(dto.getOrgId());
        entity.setAssetHdrId(dto.getAssetHdrId());
        entity.setChildAssetHdrId(dto.getChildAssetHdrId());
        entity.setChildAssetNo(dto.getChildAssetNo());
        entity.setActive(dto.getActive());
        entity.setDeletedDt(dto.getDeletedDt());
        entity.setDeletedBy(dto.getDeletedBy());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ChildAssetDTO mapToDTO(ChildAsset entity) {
        ChildAssetDTO dto = new ChildAssetDTO();
        dto.setChildAssetId(entity.getChildAssetId());
        dto.setOrgId(entity.getOrgId());
        dto.setAssetHdrId(entity.getAssetHdrId());
        dto.setChildAssetHdrId(entity.getChildAssetHdrId());
        dto.setChildAssetNo(entity.getChildAssetNo());
        dto.setActive(entity.getActive());
        dto.setDeletedDt(entity.getDeletedDt());
        dto.setDeletedBy(entity.getDeletedBy());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}