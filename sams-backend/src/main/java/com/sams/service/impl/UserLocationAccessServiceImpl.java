package com.sams.service.impl;

import com.sams.dto.UserLocationAccessDTO;
import com.sams.entity.UserLocationAccess;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.UserLocationAccessRepository;
import com.sams.service.UserLocationAccessService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserLocationAccessServiceImpl implements UserLocationAccessService {

    private final UserLocationAccessRepository repository;

    @Override
    @Transactional
    public UserLocationAccessDTO create(UserLocationAccessDTO dto) {
        UserLocationAccess entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public UserLocationAccessDTO getById(Long id) {
        UserLocationAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("UserLocationAccess not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<UserLocationAccessDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UserLocationAccessDTO update(Long id, UserLocationAccessDTO dto) {
        UserLocationAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("UserLocationAccess not found with ID: " + id));
        UserLocationAccess mapped = mapToEntity(dto);
        mapped.setUserLocationAccessId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        UserLocationAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("UserLocationAccess not found with ID: " + id));
        repository.delete(entity);
    }

    private UserLocationAccess mapToEntity(UserLocationAccessDTO dto) {
        UserLocationAccess entity = new UserLocationAccess();
        entity.setUserLocationAccessId(dto.getUserLocationAccessId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setLoginId(dto.getLoginId());
        entity.setUserId(dto.getUserId());
        entity.setAccessLocationId(dto.getAccessLocationId());
        entity.setAccessLocationName(dto.getAccessLocationName());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private UserLocationAccessDTO mapToDTO(UserLocationAccess entity) {
        UserLocationAccessDTO dto = new UserLocationAccessDTO();
        dto.setUserLocationAccessId(entity.getUserLocationAccessId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setLoginId(entity.getLoginId());
        dto.setUserId(entity.getUserId());
        dto.setAccessLocationId(entity.getAccessLocationId());
        dto.setAccessLocationName(entity.getAccessLocationName());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}