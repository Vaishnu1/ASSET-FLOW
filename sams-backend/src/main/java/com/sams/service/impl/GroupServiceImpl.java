package com.sams.service.impl;

import com.sams.dto.GroupDTO;
import com.sams.entity.Group;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.GroupRepository;
import com.sams.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository repository;

    @Override
    @Transactional
    public GroupDTO create(GroupDTO dto) {
        Group entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public GroupDTO getById(Long id) {
        Group entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Group not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<GroupDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public GroupDTO update(Long id, GroupDTO dto) {
        Group entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Group not found with ID: " + id));
        Group mapped = mapToEntity(dto);
        mapped.setGroupId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Group entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Group not found with ID: " + id));
        repository.delete(entity);
    }

    private Group mapToEntity(GroupDTO dto) {
        Group entity = new Group();
        entity.setGroupId(dto.getGroupId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setGroupName(dto.getGroupName());
        entity.setSuperAdmin(dto.getSuperAdmin());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private GroupDTO mapToDTO(Group entity) {
        GroupDTO dto = new GroupDTO();
        dto.setGroupId(entity.getGroupId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setGroupName(entity.getGroupName());
        dto.setSuperAdmin(entity.getSuperAdmin());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}