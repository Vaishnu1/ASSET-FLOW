package com.sams.service.impl;

import com.sams.dto.RetireSalvageDTO;
import com.sams.entity.RetireSalvage;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.RetireSalvageRepository;
import com.sams.service.RetireSalvageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RetireSalvageServiceImpl implements RetireSalvageService {

    private final RetireSalvageRepository repository;

    @Override
    @Transactional
    public RetireSalvageDTO create(RetireSalvageDTO dto) {
        RetireSalvage entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public RetireSalvageDTO getById(Long id) {
        RetireSalvage entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RetireSalvage not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<RetireSalvageDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RetireSalvageDTO update(Long id, RetireSalvageDTO dto) {
        RetireSalvage entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RetireSalvage not found with ID: " + id));
        RetireSalvage mapped = mapToEntity(dto);
        mapped.setRetireSalvageId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        RetireSalvage entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RetireSalvage not found with ID: " + id));
        repository.delete(entity);
    }

    private RetireSalvage mapToEntity(RetireSalvageDTO dto) {
        RetireSalvage entity = new RetireSalvage();
        entity.setRetireSalvageId(dto.getRetireSalvageId());
        entity.setAssetRetireId(dto.getAssetRetireId());
        entity.setSalvageType(dto.getSalvageType());
        entity.setModelId(dto.getModelId());
        entity.setModuleId(dto.getModuleId());
        entity.setItemId(dto.getItemId());
        entity.setStoreId(dto.getStoreId());
        entity.setQuantity(dto.getQuantity());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private RetireSalvageDTO mapToDTO(RetireSalvage entity) {
        RetireSalvageDTO dto = new RetireSalvageDTO();
        dto.setRetireSalvageId(entity.getRetireSalvageId());
        dto.setAssetRetireId(entity.getAssetRetireId());
        dto.setSalvageType(entity.getSalvageType());
        dto.setModelId(entity.getModelId());
        dto.setModuleId(entity.getModuleId());
        dto.setItemId(entity.getItemId());
        dto.setStoreId(entity.getStoreId());
        dto.setQuantity(entity.getQuantity());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}