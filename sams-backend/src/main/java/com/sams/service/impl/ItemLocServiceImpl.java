package com.sams.service.impl;

import com.sams.dto.ItemLocDTO;
import com.sams.entity.ItemLoc;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ItemLocRepository;
import com.sams.service.ItemLocService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemLocServiceImpl implements ItemLocService {

    private final ItemLocRepository repository;

    @Override
    @Transactional
    public ItemLocDTO create(ItemLocDTO dto) {
        ItemLoc entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ItemLocDTO getById(Long id) {
        ItemLoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemLoc not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ItemLocDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ItemLocDTO update(Long id, ItemLocDTO dto) {
        ItemLoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemLoc not found with ID: " + id));
        ItemLoc mapped = mapToEntity(dto);
        mapped.setItemLocId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ItemLoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemLoc not found with ID: " + id));
        repository.delete(entity);
    }

    private ItemLoc mapToEntity(ItemLocDTO dto) {
        ItemLoc entity = new ItemLoc();
        entity.setItemLocId(dto.getItemLocId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setItemId(dto.getItemId());
        entity.setActive(dto.getActive());
        entity.setItemStatus(dto.getItemStatus());
        entity.setInvoiceable(dto.getInvoiceable());
        entity.setStoreId(dto.getStoreId());
        entity.setMaxStockQty(dto.getMaxStockQty());
        entity.setMinStockQty(dto.getMinStockQty());
        entity.setCostingType(dto.getCostingType());
        entity.setSerialControlled(dto.getSerialControlled());
        entity.setBatchControlled(dto.getBatchControlled());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ItemLocDTO mapToDTO(ItemLoc entity) {
        ItemLocDTO dto = new ItemLocDTO();
        dto.setItemLocId(entity.getItemLocId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setItemId(entity.getItemId());
        dto.setActive(entity.getActive());
        dto.setItemStatus(entity.getItemStatus());
        dto.setInvoiceable(entity.getInvoiceable());
        dto.setStoreId(entity.getStoreId());
        dto.setMaxStockQty(entity.getMaxStockQty());
        dto.setMinStockQty(entity.getMinStockQty());
        dto.setCostingType(entity.getCostingType());
        dto.setSerialControlled(entity.getSerialControlled());
        dto.setBatchControlled(entity.getBatchControlled());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}