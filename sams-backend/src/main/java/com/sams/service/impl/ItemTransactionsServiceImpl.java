package com.sams.service.impl;

import com.sams.dto.ItemTransactionsDTO;
import com.sams.entity.ItemTransactions;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ItemTransactionsRepository;
import com.sams.service.ItemTransactionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemTransactionsServiceImpl implements ItemTransactionsService {

    private final ItemTransactionsRepository repository;

    @Override
    @Transactional
    public ItemTransactionsDTO create(ItemTransactionsDTO dto) {
        ItemTransactions entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ItemTransactionsDTO getById(Long id) {
        ItemTransactions entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemTransactions not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ItemTransactionsDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ItemTransactionsDTO update(Long id, ItemTransactionsDTO dto) {
        ItemTransactions entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemTransactions not found with ID: " + id));
        ItemTransactions mapped = mapToEntity(dto);
        mapped.setTransactionId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ItemTransactions entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemTransactions not found with ID: " + id));
        repository.delete(entity);
    }

    private ItemTransactions mapToEntity(ItemTransactionsDTO dto) {
        ItemTransactions entity = new ItemTransactions();
        entity.setTransactionId(dto.getTransactionId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setTransactionDate(dto.getTransactionDate());
        entity.setTransactionSourceId(dto.getTransactionSourceId());
        entity.setTransactionSourceLineId(dto.getTransactionSourceLineId());
        entity.setTransactionSourceName(dto.getTransactionSourceName());
        entity.setTransactionReference(dto.getTransactionReference());
        entity.setTransactionReferenceExternal(dto.getTransactionReferenceExternal());
        entity.setTransactionAction(dto.getTransactionAction());
        entity.setTransactionType(dto.getTransactionType());
        entity.setTransactionTypeReferenceNo(dto.getTransactionTypeReferenceNo());
        entity.setItemId(dto.getItemId());
        entity.setItemName(dto.getItemName());
        entity.setItemDescription(dto.getItemDescription());
        entity.setStoreId(dto.getStoreId());
        entity.setTransactionQty(dto.getTransactionQty());
        entity.setOrignialTransactionId(dto.getOrignialTransactionId());
        entity.setBinId(dto.getBinId());
        entity.setProjectId(dto.getProjectId());
        entity.setSupplierId(dto.getSupplierId());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setItemTypeId(dto.getItemTypeId());
        entity.setItemTypeName(dto.getItemTypeName());
        return entity;
    }

    private ItemTransactionsDTO mapToDTO(ItemTransactions entity) {
        ItemTransactionsDTO dto = new ItemTransactionsDTO();
        dto.setTransactionId(entity.getTransactionId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setTransactionDate(entity.getTransactionDate());
        dto.setTransactionSourceId(entity.getTransactionSourceId());
        dto.setTransactionSourceLineId(entity.getTransactionSourceLineId());
        dto.setTransactionSourceName(entity.getTransactionSourceName());
        dto.setTransactionReference(entity.getTransactionReference());
        dto.setTransactionReferenceExternal(entity.getTransactionReferenceExternal());
        dto.setTransactionAction(entity.getTransactionAction());
        dto.setTransactionType(entity.getTransactionType());
        dto.setTransactionTypeReferenceNo(entity.getTransactionTypeReferenceNo());
        dto.setItemId(entity.getItemId());
        dto.setItemName(entity.getItemName());
        dto.setItemDescription(entity.getItemDescription());
        dto.setStoreId(entity.getStoreId());
        dto.setTransactionQty(entity.getTransactionQty());
        dto.setOrignialTransactionId(entity.getOrignialTransactionId());
        dto.setBinId(entity.getBinId());
        dto.setProjectId(entity.getProjectId());
        dto.setSupplierId(entity.getSupplierId());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setItemTypeId(entity.getItemTypeId());
        dto.setItemTypeName(entity.getItemTypeName());
        return dto;
    }
}