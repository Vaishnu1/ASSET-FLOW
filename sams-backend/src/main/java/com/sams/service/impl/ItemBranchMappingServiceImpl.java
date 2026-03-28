package com.sams.service.impl;

import com.sams.dto.ItemBranchMappingDTO;
import com.sams.entity.ItemBranchMapping;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ItemBranchMappingRepository;
import com.sams.service.ItemBranchMappingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemBranchMappingServiceImpl implements ItemBranchMappingService {

    private final ItemBranchMappingRepository repository;

    @Override
    @Transactional
    public ItemBranchMappingDTO create(ItemBranchMappingDTO dto) {
        ItemBranchMapping entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ItemBranchMappingDTO getById(Long id) {
        ItemBranchMapping entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemBranchMapping not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ItemBranchMappingDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ItemBranchMappingDTO update(Long id, ItemBranchMappingDTO dto) {
        ItemBranchMapping entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemBranchMapping not found with ID: " + id));
        ItemBranchMapping mapped = mapToEntity(dto);
        mapped.setItemBranchId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ItemBranchMapping entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemBranchMapping not found with ID: " + id));
        repository.delete(entity);
    }

    private ItemBranchMapping mapToEntity(ItemBranchMappingDTO dto) {
        ItemBranchMapping entity = new ItemBranchMapping();
        entity.setItemBranchId(dto.getItemBranchId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocId(dto.getLocId());
        entity.setItemId(dto.getItemId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ItemBranchMappingDTO mapToDTO(ItemBranchMapping entity) {
        ItemBranchMappingDTO dto = new ItemBranchMappingDTO();
        dto.setItemBranchId(entity.getItemBranchId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocId(entity.getLocId());
        dto.setItemId(entity.getItemId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}