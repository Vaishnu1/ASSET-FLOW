package com.sams.service.impl;

import com.sams.dto.MenuDTO;
import com.sams.entity.Menu;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.MenuRepository;
import com.sams.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

    private final MenuRepository repository;

    @Override
    @Transactional
    public MenuDTO create(MenuDTO dto) {
        Menu entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public MenuDTO getById(Long id) {
        Menu entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Menu not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<MenuDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public MenuDTO update(Long id, MenuDTO dto) {
        Menu entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Menu not found with ID: " + id));
        Menu mapped = mapToEntity(dto);
        mapped.setMenuId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Menu entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Menu not found with ID: " + id));
        repository.delete(entity);
    }

    private Menu mapToEntity(MenuDTO dto) {
        Menu entity = new Menu();
        entity.setMenuId(dto.getMenuId());
        entity.setOrgId(dto.getOrgId());
        entity.setMenuName(dto.getMenuName());
        entity.setModulePath(dto.getModulePath());
        entity.setIconCls(dto.getIconCls());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private MenuDTO mapToDTO(Menu entity) {
        MenuDTO dto = new MenuDTO();
        dto.setMenuId(entity.getMenuId());
        dto.setOrgId(entity.getOrgId());
        dto.setMenuName(entity.getMenuName());
        dto.setModulePath(entity.getModulePath());
        dto.setIconCls(entity.getIconCls());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}