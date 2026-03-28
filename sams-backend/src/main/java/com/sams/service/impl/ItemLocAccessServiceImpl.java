package com.sams.service.impl;

import com.sams.dto.ItemLocAccessDTO;
import com.sams.entity.ItemLocAccess;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ItemLocAccessRepository;
import com.sams.service.ItemLocAccessService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemLocAccessServiceImpl implements ItemLocAccessService {

    private final ItemLocAccessRepository repository;

    @Override
    @Transactional
    public ItemLocAccessDTO create(ItemLocAccessDTO dto) {
        ItemLocAccess entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ItemLocAccessDTO getById(Long id) {
        ItemLocAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemLocAccess not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ItemLocAccessDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ItemLocAccessDTO update(Long id, ItemLocAccessDTO dto) {
        ItemLocAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemLocAccess not found with ID: " + id));
        ItemLocAccess mapped = mapToEntity(dto);
        mapped.setItemLocAccessId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ItemLocAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemLocAccess not found with ID: " + id));
        repository.delete(entity);
    }

    private ItemLocAccess mapToEntity(ItemLocAccessDTO dto) {
        ItemLocAccess entity = new ItemLocAccess();
        entity.setItemLocAccessId(dto.getItemLocAccessId());
        entity.setItemId(dto.getItemId());
        entity.setAccessLocId(dto.getAccessLocId());
        entity.setAccessLocName(dto.getAccessLocName());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ItemLocAccessDTO mapToDTO(ItemLocAccess entity) {
        ItemLocAccessDTO dto = new ItemLocAccessDTO();
        dto.setItemLocAccessId(entity.getItemLocAccessId());
        dto.setItemId(entity.getItemId());
        dto.setAccessLocId(entity.getAccessLocId());
        dto.setAccessLocName(entity.getAccessLocName());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}