package com.sams.service.impl;

import com.sams.dto.UserGroupMappingDTO;
import com.sams.entity.UserGroupMapping;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.UserGroupMappingRepository;
import com.sams.service.UserGroupMappingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserGroupMappingServiceImpl implements UserGroupMappingService {

    private final UserGroupMappingRepository repository;

    @Override
    @Transactional
    public UserGroupMappingDTO create(UserGroupMappingDTO dto) {
        UserGroupMapping entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public UserGroupMappingDTO getById(Long id) {
        UserGroupMapping entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("UserGroupMapping not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<UserGroupMappingDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UserGroupMappingDTO update(Long id, UserGroupMappingDTO dto) {
        UserGroupMapping entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("UserGroupMapping not found with ID: " + id));
        UserGroupMapping mapped = mapToEntity(dto);
        mapped.setUserGroupMappingId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        UserGroupMapping entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("UserGroupMapping not found with ID: " + id));
        repository.delete(entity);
    }

    private UserGroupMapping mapToEntity(UserGroupMappingDTO dto) {
        UserGroupMapping entity = new UserGroupMapping();
        entity.setUserGroupMappingId(dto.getUserGroupMappingId());
        entity.setOrgId(dto.getOrgId());
        entity.setUserGroupId(dto.getUserGroupId());
        entity.setUserGroupName(dto.getUserGroupName());
        entity.setUserId(dto.getUserId());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setActive(dto.getActive());
        return entity;
    }

    private UserGroupMappingDTO mapToDTO(UserGroupMapping entity) {
        UserGroupMappingDTO dto = new UserGroupMappingDTO();
        dto.setUserGroupMappingId(entity.getUserGroupMappingId());
        dto.setOrgId(entity.getOrgId());
        dto.setUserGroupId(entity.getUserGroupId());
        dto.setUserGroupName(entity.getUserGroupName());
        dto.setUserId(entity.getUserId());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setActive(entity.getActive());
        return dto;
    }
}