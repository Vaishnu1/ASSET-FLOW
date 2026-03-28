package com.sams.service.impl;

import com.sams.dto.AssetTransactionDTO;
import com.sams.entity.AssetTransaction;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetTransactionRepository;
import com.sams.service.AssetTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetTransactionServiceImpl implements AssetTransactionService {

    private final AssetTransactionRepository repository;

    @Override
    @Transactional
    public AssetTransactionDTO create(AssetTransactionDTO dto) {
        AssetTransaction entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetTransactionDTO getById(Long id) {
        AssetTransaction entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetTransaction not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetTransactionDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetTransactionDTO update(Long id, AssetTransactionDTO dto) {
        AssetTransaction entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetTransaction not found with ID: " + id));
        AssetTransaction mapped = mapToEntity(dto);
        mapped.setAssetTransactionId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetTransaction entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetTransaction not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetTransaction mapToEntity(AssetTransactionDTO dto) {
        AssetTransaction entity = new AssetTransaction();
        entity.setAssetTransactionId(dto.getAssetTransactionId());
        entity.setAssetHdrId(dto.getAssetHdrId());
        entity.setAssetTransactionSource(dto.getAssetTransactionSource());
        entity.setAssetTransactionSourceDesc(dto.getAssetTransactionSourceDesc());
        entity.setAssetTransactionSourceId(dto.getAssetTransactionSourceId());
        entity.setAssetTransactionSourceNo(dto.getAssetTransactionSourceNo());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setAssetTransactionName(dto.getAssetTransactionName());
        return entity;
    }

    private AssetTransactionDTO mapToDTO(AssetTransaction entity) {
        AssetTransactionDTO dto = new AssetTransactionDTO();
        dto.setAssetTransactionId(entity.getAssetTransactionId());
        dto.setAssetHdrId(entity.getAssetHdrId());
        dto.setAssetTransactionSource(entity.getAssetTransactionSource());
        dto.setAssetTransactionSourceDesc(entity.getAssetTransactionSourceDesc());
        dto.setAssetTransactionSourceId(entity.getAssetTransactionSourceId());
        dto.setAssetTransactionSourceNo(entity.getAssetTransactionSourceNo());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setAssetTransactionName(entity.getAssetTransactionName());
        return dto;
    }
}