package com.sams.service.impl;

import com.sams.dto.ItemModuleDTO;
import com.sams.entity.ItemModule;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ItemModuleRepository;
import com.sams.service.ItemModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemModuleServiceImpl implements ItemModuleService {

    private final ItemModuleRepository repository;

    @Override
    @Transactional
    public ItemModuleDTO create(ItemModuleDTO dto) {
        ItemModule entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ItemModuleDTO getById(Long id) {
        ItemModule entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemModule not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ItemModuleDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ItemModuleDTO update(Long id, ItemModuleDTO dto) {
        ItemModule entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemModule not found with ID: " + id));
        ItemModule mapped = mapToEntity(dto);
        mapped.setItemModuleId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ItemModule entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemModule not found with ID: " + id));
        repository.delete(entity);
    }

    private ItemModule mapToEntity(ItemModuleDTO dto) {
        ItemModule entity = new ItemModule();
        entity.setItemModuleId(dto.getItemModuleId());
        entity.setOrgId(dto.getOrgId());
        entity.setItemModuleName(dto.getItemModuleName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ItemModuleDTO mapToDTO(ItemModule entity) {
        ItemModuleDTO dto = new ItemModuleDTO();
        dto.setItemModuleId(entity.getItemModuleId());
        dto.setOrgId(entity.getOrgId());
        dto.setItemModuleName(entity.getItemModuleName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}