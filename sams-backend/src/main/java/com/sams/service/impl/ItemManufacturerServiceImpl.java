package com.sams.service.impl;

import com.sams.dto.ItemManufacturerDTO;
import com.sams.entity.ItemManufacturer;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ItemManufacturerRepository;
import com.sams.service.ItemManufacturerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemManufacturerServiceImpl implements ItemManufacturerService {

    private final ItemManufacturerRepository repository;

    @Override
    @Transactional
    public ItemManufacturerDTO create(ItemManufacturerDTO dto) {
        ItemManufacturer entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ItemManufacturerDTO getById(Long id) {
        ItemManufacturer entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemManufacturer not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ItemManufacturerDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ItemManufacturerDTO update(Long id, ItemManufacturerDTO dto) {
        ItemManufacturer entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemManufacturer not found with ID: " + id));
        ItemManufacturer mapped = mapToEntity(dto);
        mapped.setItemMakeId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ItemManufacturer entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemManufacturer not found with ID: " + id));
        repository.delete(entity);
    }

    private ItemManufacturer mapToEntity(ItemManufacturerDTO dto) {
        ItemManufacturer entity = new ItemManufacturer();
        entity.setItemMakeId(dto.getItemMakeId());
        entity.setOrgId(dto.getOrgId());
        entity.setItemId(dto.getItemId());
        entity.setManufacturerId(dto.getManufacturerId());
        entity.setManufacturerPartNo(dto.getManufacturerPartNo());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ItemManufacturerDTO mapToDTO(ItemManufacturer entity) {
        ItemManufacturerDTO dto = new ItemManufacturerDTO();
        dto.setItemMakeId(entity.getItemMakeId());
        dto.setOrgId(entity.getOrgId());
        dto.setItemId(entity.getItemId());
        dto.setManufacturerId(entity.getManufacturerId());
        dto.setManufacturerPartNo(entity.getManufacturerPartNo());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}