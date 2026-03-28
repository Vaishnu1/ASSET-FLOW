package com.sams.service.impl;

import com.sams.dto.ModuleItemsDTO;
import com.sams.entity.ModuleItems;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ModuleItemsRepository;
import com.sams.service.ModuleItemsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModuleItemsServiceImpl implements ModuleItemsService {

    private final ModuleItemsRepository repository;

    @Override
    @Transactional
    public ModuleItemsDTO create(ModuleItemsDTO dto) {
        ModuleItems entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ModuleItemsDTO getById(Long id) {
        ModuleItems entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModuleItems not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ModuleItemsDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ModuleItemsDTO update(Long id, ModuleItemsDTO dto) {
        ModuleItems entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModuleItems not found with ID: " + id));
        ModuleItems mapped = mapToEntity(dto);
        mapped.setModuleItemId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ModuleItems entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModuleItems not found with ID: " + id));
        repository.delete(entity);
    }

    private ModuleItems mapToEntity(ModuleItemsDTO dto) {
        ModuleItems entity = new ModuleItems();
        entity.setModuleItemId(dto.getModuleItemId());
        entity.setOrgId(dto.getOrgId());
        entity.setModuleId(dto.getModuleId());
        entity.setItemId(dto.getItemId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ModuleItemsDTO mapToDTO(ModuleItems entity) {
        ModuleItemsDTO dto = new ModuleItemsDTO();
        dto.setModuleItemId(entity.getModuleItemId());
        dto.setOrgId(entity.getOrgId());
        dto.setModuleId(entity.getModuleId());
        dto.setItemId(entity.getItemId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}