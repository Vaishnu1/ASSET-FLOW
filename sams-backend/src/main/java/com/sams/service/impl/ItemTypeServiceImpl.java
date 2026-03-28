package com.sams.service.impl;

import com.sams.dto.ItemTypeDTO;
import com.sams.entity.ItemType;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ItemTypeRepository;
import com.sams.service.ItemTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemTypeServiceImpl implements ItemTypeService {

    private final ItemTypeRepository repository;

    @Override
    @Transactional
    public ItemTypeDTO createItemType(ItemTypeDTO dto) {
        ItemType entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ItemTypeDTO getItemTypeById(Long id) {
        ItemType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemType not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ItemTypeDTO> getAllItemTypes() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ItemTypeDTO updateItemType(Long id, ItemTypeDTO dto) {
        ItemType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemType not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        ItemType mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteItemType(Long id) {
        ItemType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemType not found with ID: " + id));
        repository.delete(entity);
    }

    private ItemType mapToEntity(ItemTypeDTO dto) {
        ItemType entity = new ItemType();
        entity.setOrgId(dto.getOrgId());
        entity.setItemTypeDesc(dto.getItemTypeDesc());
        entity.setActive(dto.getActive());
        entity.setItemTypeId(dto.getItemTypeId());
        entity.setItemTypeName(dto.getItemTypeName());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setOrgName(dto.getOrgName());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setSystemGenerated(dto.getSystemGenerated());
        return entity;
    }

    private ItemTypeDTO mapToDTO(ItemType entity) {
        ItemTypeDTO dto = new ItemTypeDTO();
        dto.setId(entity.getId());
        dto.setOrgId(entity.getOrgId());
        dto.setItemTypeDesc(entity.getItemTypeDesc());
        dto.setActive(entity.getActive());
        dto.setItemTypeId(entity.getItemTypeId());
        dto.setItemTypeName(entity.getItemTypeName());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setOrgName(entity.getOrgName());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setSystemGenerated(entity.getSystemGenerated());
        return dto;
    }
}