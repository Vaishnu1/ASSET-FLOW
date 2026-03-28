package com.sams.service.impl;

import com.sams.dto.ItemCategoryDTO;
import com.sams.entity.ItemCategory;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ItemCategoryRepository;
import com.sams.service.ItemCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemCategoryServiceImpl implements ItemCategoryService {

    private final ItemCategoryRepository repository;

    @Override
    @Transactional
    public ItemCategoryDTO createItemCategory(ItemCategoryDTO dto) {
        ItemCategory entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ItemCategoryDTO getItemCategoryById(Long id) {
        ItemCategory entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemCategory not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ItemCategoryDTO> getAllItemCategories() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ItemCategoryDTO updateItemCategory(Long id, ItemCategoryDTO dto) {
        ItemCategory entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemCategory not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        ItemCategory mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteItemCategory(Long id) {
        ItemCategory entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemCategory not found with ID: " + id));
        repository.delete(entity);
    }

    private ItemCategory mapToEntity(ItemCategoryDTO dto) {
        ItemCategory entity = new ItemCategory();
        entity.setOrgId(dto.getOrgId());
        entity.setCategoryDesc(dto.getCategoryDesc());
        entity.setActive(dto.getActive());
        entity.setCategoryId(dto.getCategoryId());
        entity.setCategoryName(dto.getCategoryName());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setOrgName(dto.getOrgName());
        return entity;
    }

    private ItemCategoryDTO mapToDTO(ItemCategory entity) {
        ItemCategoryDTO dto = new ItemCategoryDTO();
        dto.setId(entity.getId());
        dto.setOrgId(entity.getOrgId());
        dto.setCategoryDesc(entity.getCategoryDesc());
        dto.setActive(entity.getActive());
        dto.setCategoryId(entity.getCategoryId());
        dto.setCategoryName(entity.getCategoryName());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setOrgName(entity.getOrgName());
        return dto;
    }
}