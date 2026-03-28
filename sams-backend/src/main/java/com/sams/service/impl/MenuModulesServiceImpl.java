package com.sams.service.impl;

import com.sams.dto.MenuModulesDTO;
import com.sams.entity.MenuModules;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.MenuModulesRepository;
import com.sams.service.MenuModulesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MenuModulesServiceImpl implements MenuModulesService {

    private final MenuModulesRepository repository;

    @Override
    @Transactional
    public MenuModulesDTO create(MenuModulesDTO dto) {
        MenuModules entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public MenuModulesDTO getById(Long id) {
        MenuModules entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MenuModules not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<MenuModulesDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public MenuModulesDTO update(Long id, MenuModulesDTO dto) {
        MenuModules entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MenuModules not found with ID: " + id));
        MenuModules mapped = mapToEntity(dto);
        mapped.setMenuModuleId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        MenuModules entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MenuModules not found with ID: " + id));
        repository.delete(entity);
    }

    private MenuModules mapToEntity(MenuModulesDTO dto) {
        MenuModules entity = new MenuModules();
        entity.setMenuModuleId(dto.getMenuModuleId());
        entity.setMenuId(dto.getMenuId());
        entity.setModuleId(dto.getModuleId());
        entity.setModuleSeq(dto.getModuleSeq());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private MenuModulesDTO mapToDTO(MenuModules entity) {
        MenuModulesDTO dto = new MenuModulesDTO();
        dto.setMenuModuleId(entity.getMenuModuleId());
        dto.setMenuId(entity.getMenuId());
        dto.setModuleId(entity.getModuleId());
        dto.setModuleSeq(entity.getModuleSeq());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}