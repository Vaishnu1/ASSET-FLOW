package com.sams.service.impl;

import com.sams.dto.ModulesDTO;
import com.sams.entity.Modules;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ModulesRepository;
import com.sams.service.ModulesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModulesServiceImpl implements ModulesService {

    private final ModulesRepository repository;

    @Override
    @Transactional
    public ModulesDTO create(ModulesDTO dto) {
        Modules entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ModulesDTO getById(Long id) {
        Modules entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Modules not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ModulesDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ModulesDTO update(Long id, ModulesDTO dto) {
        Modules entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Modules not found with ID: " + id));
        Modules mapped = mapToEntity(dto);
        mapped.setModuleId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Modules entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Modules not found with ID: " + id));
        repository.delete(entity);
    }

    private Modules mapToEntity(ModulesDTO dto) {
        Modules entity = new Modules();
        entity.setModuleId(dto.getModuleId());
        entity.setModuleKey(dto.getModuleKey());
        entity.setModuleDesc(dto.getModuleDesc());
        entity.setModuleType(dto.getModuleType());
        entity.setModuleGroupName(dto.getModuleGroupName());
        entity.setModuleLocalName(dto.getModuleLocalName());
        entity.setIconCls(dto.getIconCls());
        entity.setParentModuleId(dto.getParentModuleId());
        entity.setModulePath(dto.getModulePath());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private ModulesDTO mapToDTO(Modules entity) {
        ModulesDTO dto = new ModulesDTO();
        dto.setModuleId(entity.getModuleId());
        dto.setModuleKey(entity.getModuleKey());
        dto.setModuleDesc(entity.getModuleDesc());
        dto.setModuleType(entity.getModuleType());
        dto.setModuleGroupName(entity.getModuleGroupName());
        dto.setModuleLocalName(entity.getModuleLocalName());
        dto.setIconCls(entity.getIconCls());
        dto.setParentModuleId(entity.getParentModuleId());
        dto.setModulePath(entity.getModulePath());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}