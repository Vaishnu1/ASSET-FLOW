package com.sams.service.impl;

import com.sams.dto.AssetDocDTO;
import com.sams.entity.AssetDoc;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetDocRepository;
import com.sams.service.AssetDocService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetDocServiceImpl implements AssetDocService {

    private final AssetDocRepository repository;

    @Override
    @Transactional
    public AssetDocDTO create(AssetDocDTO dto) {
        AssetDoc entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetDocDTO getById(Long id) {
        AssetDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetDoc not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetDocDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetDocDTO update(Long id, AssetDocDTO dto) {
        AssetDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetDoc not found with ID: " + id));
        AssetDoc mapped = mapToEntity(dto);
        mapped.setAssetDocId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetDoc not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetDoc mapToEntity(AssetDocDTO dto) {
        AssetDoc entity = new AssetDoc();
        entity.setAssetDocId(dto.getAssetDocId());
        entity.setOrgId(dto.getOrgId());
        entity.setAssetHdrId(dto.getAssetHdrId());
        entity.setDocName(dto.getDocName());
        entity.setDocType(dto.getDocType());
        entity.setFilePath(dto.getFilePath());
        entity.setContentType(dto.getContentType());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setStartDt(dto.getStartDt());
        entity.setExpiryDt(dto.getExpiryDt());
        entity.setFromSource(dto.getFromSource());
        return entity;
    }

    private AssetDocDTO mapToDTO(AssetDoc entity) {
        AssetDocDTO dto = new AssetDocDTO();
        dto.setAssetDocId(entity.getAssetDocId());
        dto.setOrgId(entity.getOrgId());
        dto.setAssetHdrId(entity.getAssetHdrId());
        dto.setDocName(entity.getDocName());
        dto.setDocType(entity.getDocType());
        dto.setFilePath(entity.getFilePath());
        dto.setContentType(entity.getContentType());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setStartDt(entity.getStartDt());
        dto.setExpiryDt(entity.getExpiryDt());
        dto.setFromSource(entity.getFromSource());
        return dto;
    }
}