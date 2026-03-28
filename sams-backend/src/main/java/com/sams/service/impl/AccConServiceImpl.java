package com.sams.service.impl;

import com.sams.dto.AccConDTO;
import com.sams.entity.AccCon;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AccConRepository;
import com.sams.service.AccConService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccConServiceImpl implements AccConService {

    private final AccConRepository repository;

    @Override
    @Transactional
    public AccConDTO createAccCon(AccConDTO dto) {
        AccCon entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AccConDTO getAccConById(Long id) {
        AccCon entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AccCon not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AccConDTO> getAllAccCons() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AccConDTO updateAccCon(Long id, AccConDTO dto) {
        AccCon entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AccCon not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        AccCon mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteAccCon(Long id) {
        AccCon entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AccCon not found with ID: " + id));
        repository.delete(entity);
    }

    private AccCon mapToEntity(AccConDTO dto) {
        AccCon entity = new AccCon();
        entity.setAccessorieConsumableId(dto.getAccessorieConsumableId());
        entity.setAssetHdrId(dto.getAssetHdrId());
        entity.setItemId(dto.getItemId());
        entity.setItemName(dto.getItemName());
        entity.setItemDesc(dto.getItemDesc());
        entity.setItemType(dto.getItemType());
        entity.setItemCategoryCode(dto.getItemCategoryCode());
        entity.setManufacturerName(dto.getManufacturerName());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        return entity;
    }

    private AccConDTO mapToDTO(AccCon entity) {
        AccConDTO dto = new AccConDTO();
        dto.setId(entity.getId());
        dto.setAccessorieConsumableId(entity.getAccessorieConsumableId());
        dto.setAssetHdrId(entity.getAssetHdrId());
        dto.setItemId(entity.getItemId());
        dto.setItemName(entity.getItemName());
        dto.setItemDesc(entity.getItemDesc());
        dto.setItemType(entity.getItemType());
        dto.setItemCategoryCode(entity.getItemCategoryCode());
        dto.setManufacturerName(entity.getManufacturerName());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        return dto;
    }
}