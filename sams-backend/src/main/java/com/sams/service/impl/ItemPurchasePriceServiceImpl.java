package com.sams.service.impl;

import com.sams.dto.ItemPurchasePriceDTO;
import com.sams.entity.ItemPurchasePrice;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ItemPurchasePriceRepository;
import com.sams.service.ItemPurchasePriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemPurchasePriceServiceImpl implements ItemPurchasePriceService {

    private final ItemPurchasePriceRepository repository;

    @Override
    @Transactional
    public ItemPurchasePriceDTO create(ItemPurchasePriceDTO dto) {
        ItemPurchasePrice entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ItemPurchasePriceDTO getById(Long id) {
        ItemPurchasePrice entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemPurchasePrice not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ItemPurchasePriceDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ItemPurchasePriceDTO update(Long id, ItemPurchasePriceDTO dto) {
        ItemPurchasePrice entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemPurchasePrice not found with ID: " + id));
        ItemPurchasePrice mapped = mapToEntity(dto);
        mapped.setItemPurchasePriceId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ItemPurchasePrice entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemPurchasePrice not found with ID: " + id));
        repository.delete(entity);
    }

    private ItemPurchasePrice mapToEntity(ItemPurchasePriceDTO dto) {
        ItemPurchasePrice entity = new ItemPurchasePrice();
        entity.setItemPurchasePriceId(dto.getItemPurchasePriceId());
        entity.setItemLocId(dto.getItemLocId());
        entity.setSupplierSiteId(dto.getSupplierSiteId());
        entity.setPriceEffFromDt(dto.getPriceEffFromDt());
        entity.setPriceEffToDt(dto.getPriceEffToDt());
        entity.setUnitPurchasePrice(dto.getUnitPurchasePrice());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ItemPurchasePriceDTO mapToDTO(ItemPurchasePrice entity) {
        ItemPurchasePriceDTO dto = new ItemPurchasePriceDTO();
        dto.setItemPurchasePriceId(entity.getItemPurchasePriceId());
        dto.setItemLocId(entity.getItemLocId());
        dto.setSupplierSiteId(entity.getSupplierSiteId());
        dto.setPriceEffFromDt(entity.getPriceEffFromDt());
        dto.setPriceEffToDt(entity.getPriceEffToDt());
        dto.setUnitPurchasePrice(entity.getUnitPurchasePrice());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}