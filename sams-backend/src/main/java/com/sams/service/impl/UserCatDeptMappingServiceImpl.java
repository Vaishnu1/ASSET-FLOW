package com.sams.service.impl;

import com.sams.dto.UserCatDeptMappingDTO;
import com.sams.entity.UserCatDeptMapping;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.UserCatDeptMappingRepository;
import com.sams.service.UserCatDeptMappingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserCatDeptMappingServiceImpl implements UserCatDeptMappingService {

    private final UserCatDeptMappingRepository repository;

    @Override
    @Transactional
    public UserCatDeptMappingDTO create(UserCatDeptMappingDTO dto) {
        UserCatDeptMapping entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public UserCatDeptMappingDTO getById(Long id) {
        UserCatDeptMapping entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("UserCatDeptMapping not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<UserCatDeptMappingDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UserCatDeptMappingDTO update(Long id, UserCatDeptMappingDTO dto) {
        UserCatDeptMapping entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("UserCatDeptMapping not found with ID: " + id));
        UserCatDeptMapping mapped = mapToEntity(dto);
        mapped.setUserCatDeptMappingId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        UserCatDeptMapping entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("UserCatDeptMapping not found with ID: " + id));
        repository.delete(entity);
    }

    private UserCatDeptMapping mapToEntity(UserCatDeptMappingDTO dto) {
        UserCatDeptMapping entity = new UserCatDeptMapping();
        entity.setUserCatDeptMappingId(dto.getUserCatDeptMappingId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setUserId(dto.getUserId());
        entity.setCategoryId(dto.getCategoryId());
        entity.setDepartmentId(dto.getDepartmentId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private UserCatDeptMappingDTO mapToDTO(UserCatDeptMapping entity) {
        UserCatDeptMappingDTO dto = new UserCatDeptMappingDTO();
        dto.setUserCatDeptMappingId(entity.getUserCatDeptMappingId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setUserId(entity.getUserId());
        dto.setCategoryId(entity.getCategoryId());
        dto.setDepartmentId(entity.getDepartmentId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}