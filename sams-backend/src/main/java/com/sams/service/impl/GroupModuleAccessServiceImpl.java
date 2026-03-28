package com.sams.service.impl;

import com.sams.dto.GroupModuleAccessDTO;
import com.sams.entity.GroupModuleAccess;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.GroupModuleAccessRepository;
import com.sams.service.GroupModuleAccessService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupModuleAccessServiceImpl implements GroupModuleAccessService {

    private final GroupModuleAccessRepository repository;

    @Override
    @Transactional
    public GroupModuleAccessDTO create(GroupModuleAccessDTO dto) {
        GroupModuleAccess entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public GroupModuleAccessDTO getById(Long id) {
        GroupModuleAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GroupModuleAccess not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<GroupModuleAccessDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public GroupModuleAccessDTO update(Long id, GroupModuleAccessDTO dto) {
        GroupModuleAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GroupModuleAccess not found with ID: " + id));
        GroupModuleAccess mapped = mapToEntity(dto);
        mapped.setGroupAccessId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        GroupModuleAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GroupModuleAccess not found with ID: " + id));
        repository.delete(entity);
    }

    private GroupModuleAccess mapToEntity(GroupModuleAccessDTO dto) {
        GroupModuleAccess entity = new GroupModuleAccess();
        entity.setGroupAccessId(dto.getGroupAccessId());
        entity.setOrgId(dto.getOrgId());
        entity.setGroupId(dto.getGroupId());
        entity.setModuleId(dto.getModuleId());
        entity.setCreateFlg(dto.getCreateFlg());
        entity.setReadFlg(dto.getReadFlg());
        entity.setUpdateFlg(dto.getUpdateFlg());
        entity.setDeleteFlg(dto.getDeleteFlg());
        entity.setExportFlg(dto.getExportFlg());
        entity.setImportFlg(dto.getImportFlg());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private GroupModuleAccessDTO mapToDTO(GroupModuleAccess entity) {
        GroupModuleAccessDTO dto = new GroupModuleAccessDTO();
        dto.setGroupAccessId(entity.getGroupAccessId());
        dto.setOrgId(entity.getOrgId());
        dto.setGroupId(entity.getGroupId());
        dto.setModuleId(entity.getModuleId());
        dto.setCreateFlg(entity.getCreateFlg());
        dto.setReadFlg(entity.getReadFlg());
        dto.setUpdateFlg(entity.getUpdateFlg());
        dto.setDeleteFlg(entity.getDeleteFlg());
        dto.setExportFlg(entity.getExportFlg());
        dto.setImportFlg(entity.getImportFlg());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}