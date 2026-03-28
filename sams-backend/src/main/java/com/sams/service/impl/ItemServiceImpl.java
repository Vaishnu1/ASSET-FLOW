package com.sams.service.impl;

import com.sams.dto.ItemDTO;
import com.sams.entity.Item;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ItemRepository;
import com.sams.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository repository;

    @Override
    @Transactional
    public ItemDTO createItem(ItemDTO dto) {
        Item entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ItemDTO getItemById(Long id) {
        Item entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Item not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ItemDTO> getAllItems() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ItemDTO updateItem(Long id, ItemDTO dto) {
        Item entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Item not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        Item mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteItem(Long id) {
        Item entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Item not found with ID: " + id));
        repository.delete(entity);
    }

    private Item mapToEntity(ItemDTO dto) {
        Item entity = new Item();
        entity.setItemLocId(dto.getItemLocId());
        entity.setLocationId(dto.getLocationId());
        entity.setInvoiceable(dto.getInvoiceable());
        entity.setItemStatus(dto.getItemStatus());
        entity.setStoreId(dto.getStoreId());
        entity.setMaxStockQty(dto.getMaxStockQty());
        entity.setMinStockQty(dto.getMinStockQty());
        entity.setCostingType(dto.getCostingType());
        entity.setSerialControlled(dto.getSerialControlled());
        entity.setBatchControlled(dto.getBatchControlled());
        entity.setItemMasterId(dto.getItemMasterId());
        entity.setSupplierSiteId(dto.getSupplierSiteId());
        entity.setLocationName(dto.getLocationName());
        entity.setItemNameConcat(dto.getItemNameConcat());
        entity.setItemSupplierList(dto.getItemSupplierList());
        entity.setItemLocAccessList(dto.getItemLocAccessList());
        entity.setTotalCost(dto.getTotalCost());
        entity.setItemApprovalStatus(dto.getItemApprovalStatus());
        entity.setItemMasterTO(dto.getItemMasterTO());
        entity.setActive(dto.getActive());
        entity.setActiveDisplay(dto.getActiveDisplay());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setStoreName(dto.getStoreName());
        return entity;
    }

    private ItemDTO mapToDTO(Item entity) {
        ItemDTO dto = new ItemDTO();
        dto.setId(entity.getId());
        dto.setItemLocId(entity.getItemLocId());
        dto.setLocationId(entity.getLocationId());
        dto.setInvoiceable(entity.getInvoiceable());
        dto.setItemStatus(entity.getItemStatus());
        dto.setStoreId(entity.getStoreId());
        dto.setMaxStockQty(entity.getMaxStockQty());
        dto.setMinStockQty(entity.getMinStockQty());
        dto.setCostingType(entity.getCostingType());
        dto.setSerialControlled(entity.getSerialControlled());
        dto.setBatchControlled(entity.getBatchControlled());
        dto.setItemMasterId(entity.getItemMasterId());
        dto.setSupplierSiteId(entity.getSupplierSiteId());
        dto.setLocationName(entity.getLocationName());
        dto.setItemNameConcat(entity.getItemNameConcat());
        dto.setItemSupplierList(entity.getItemSupplierList());
        dto.setItemLocAccessList(entity.getItemLocAccessList());
        dto.setTotalCost(entity.getTotalCost());
        dto.setItemApprovalStatus(entity.getItemApprovalStatus());
        dto.setItemMasterTO(entity.getItemMasterTO());
        dto.setActive(entity.getActive());
        dto.setActiveDisplay(entity.getActiveDisplay());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setStoreName(entity.getStoreName());
        return dto;
    }
}