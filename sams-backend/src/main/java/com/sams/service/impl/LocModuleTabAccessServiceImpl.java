package com.sams.service.impl;

import com.sams.dto.LocModuleTabAccessDTO;
import com.sams.entity.LocModuleTabAccess;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.LocModuleTabAccessRepository;
import com.sams.service.LocModuleTabAccessService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocModuleTabAccessServiceImpl implements LocModuleTabAccessService {

    private final LocModuleTabAccessRepository repository;

    @Override
    @Transactional
    public LocModuleTabAccessDTO create(LocModuleTabAccessDTO dto) {
        LocModuleTabAccess entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public LocModuleTabAccessDTO getById(Long id) {
        LocModuleTabAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocModuleTabAccess not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<LocModuleTabAccessDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LocModuleTabAccessDTO update(Long id, LocModuleTabAccessDTO dto) {
        LocModuleTabAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocModuleTabAccess not found with ID: " + id));
        LocModuleTabAccess mapped = mapToEntity(dto);
        mapped.setLocModuleTabAccessId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        LocModuleTabAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocModuleTabAccess not found with ID: " + id));
        repository.delete(entity);
    }

    private LocModuleTabAccess mapToEntity(LocModuleTabAccessDTO dto) {
        LocModuleTabAccess entity = new LocModuleTabAccess();
        entity.setLocModuleTabAccessId(dto.getLocModuleTabAccessId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setModuleName(dto.getModuleName());
        entity.setTabName(dto.getTabName());
        entity.setTabDisplayName(dto.getTabDisplayName());
        entity.setIsEnabled(dto.getIsEnabled());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private LocModuleTabAccessDTO mapToDTO(LocModuleTabAccess entity) {
        LocModuleTabAccessDTO dto = new LocModuleTabAccessDTO();
        dto.setLocModuleTabAccessId(entity.getLocModuleTabAccessId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setModuleName(entity.getModuleName());
        dto.setTabName(entity.getTabName());
        dto.setTabDisplayName(entity.getTabDisplayName());
        dto.setIsEnabled(entity.getIsEnabled());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}