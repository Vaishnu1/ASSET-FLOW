package com.sams.service.impl;

import com.sams.dto.AssetRetDocDTO;
import com.sams.entity.AssetRetDoc;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetRetDocRepository;
import com.sams.service.AssetRetDocService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetRetDocServiceImpl implements AssetRetDocService {

    private final AssetRetDocRepository repository;

    @Override
    @Transactional
    public AssetRetDocDTO create(AssetRetDocDTO dto) {
        AssetRetDoc entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetRetDocDTO getById(Long id) {
        AssetRetDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetRetDoc not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetRetDocDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetRetDocDTO update(Long id, AssetRetDocDTO dto) {
        AssetRetDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetRetDoc not found with ID: " + id));
        AssetRetDoc mapped = mapToEntity(dto);
        mapped.setAssetRetDocId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetRetDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetRetDoc not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetRetDoc mapToEntity(AssetRetDocDTO dto) {
        AssetRetDoc entity = new AssetRetDoc();
        entity.setAssetRetDocId(dto.getAssetRetDocId());
        entity.setOrgId(dto.getOrgId());
        entity.setAssetHdrId(dto.getAssetHdrId());
        entity.setDocName(dto.getDocName());
        entity.setFileName(dto.getFileName());
        entity.setDocType(dto.getDocType());
        entity.setFilePath(dto.getFilePath());
        entity.setContentType(dto.getContentType());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private AssetRetDocDTO mapToDTO(AssetRetDoc entity) {
        AssetRetDocDTO dto = new AssetRetDocDTO();
        dto.setAssetRetDocId(entity.getAssetRetDocId());
        dto.setOrgId(entity.getOrgId());
        dto.setAssetHdrId(entity.getAssetHdrId());
        dto.setDocName(entity.getDocName());
        dto.setFileName(entity.getFileName());
        dto.setDocType(entity.getDocType());
        dto.setFilePath(entity.getFilePath());
        dto.setContentType(entity.getContentType());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}