package com.sams.service.impl;

import com.sams.dto.ItemApprovedSupplierDTO;
import com.sams.entity.ItemApprovedSupplier;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ItemApprovedSupplierRepository;
import com.sams.service.ItemApprovedSupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemApprovedSupplierServiceImpl implements ItemApprovedSupplierService {

    private final ItemApprovedSupplierRepository repository;

    @Override
    @Transactional
    public ItemApprovedSupplierDTO createItemApprovedSupplier(ItemApprovedSupplierDTO dto) {
        ItemApprovedSupplier entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ItemApprovedSupplierDTO getItemApprovedSupplierById(Long id) {
        ItemApprovedSupplier entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemApprovedSupplier not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ItemApprovedSupplierDTO> getAllItemApprovedSuppliers() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ItemApprovedSupplierDTO updateItemApprovedSupplier(Long id, ItemApprovedSupplierDTO dto) {
        ItemApprovedSupplier entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemApprovedSupplier not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        ItemApprovedSupplier mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteItemApprovedSupplier(Long id) {
        ItemApprovedSupplier entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemApprovedSupplier not found with ID: " + id));
        repository.delete(entity);
    }

    private ItemApprovedSupplier mapToEntity(ItemApprovedSupplierDTO dto) {
        ItemApprovedSupplier entity = new ItemApprovedSupplier();
        entity.setItemApprovedSuppId(dto.getItemApprovedSuppId());
        entity.setItemId(dto.getItemId());
        entity.setItemName(dto.getItemName());
        entity.setSupplierId(dto.getSupplierId());
        entity.setSupplierName(dto.getSupplierName());
        entity.setSupplierItemCd(dto.getSupplierItemCd());
        entity.setSourcingPercent(dto.getSourcingPercent());
        entity.setLeadTimeDays(dto.getLeadTimeDays());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setSupplierSiteId(dto.getSupplierSiteId());
        entity.setSupplierSiteName(dto.getSupplierSiteName());
        return entity;
    }

    private ItemApprovedSupplierDTO mapToDTO(ItemApprovedSupplier entity) {
        ItemApprovedSupplierDTO dto = new ItemApprovedSupplierDTO();
        dto.setId(entity.getId());
        dto.setItemApprovedSuppId(entity.getItemApprovedSuppId());
        dto.setItemId(entity.getItemId());
        dto.setItemName(entity.getItemName());
        dto.setSupplierId(entity.getSupplierId());
        dto.setSupplierName(entity.getSupplierName());
        dto.setSupplierItemCd(entity.getSupplierItemCd());
        dto.setSourcingPercent(entity.getSourcingPercent());
        dto.setLeadTimeDays(entity.getLeadTimeDays());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setSupplierSiteId(entity.getSupplierSiteId());
        dto.setSupplierSiteName(entity.getSupplierSiteName());
        return dto;
    }
}