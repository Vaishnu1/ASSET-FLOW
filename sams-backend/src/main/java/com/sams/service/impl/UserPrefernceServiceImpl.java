package com.sams.service.impl;

import com.sams.dto.UserPrefernceDTO;
import com.sams.entity.UserPrefernce;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.UserPrefernceRepository;
import com.sams.service.UserPrefernceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserPrefernceServiceImpl implements UserPrefernceService {

    private final UserPrefernceRepository repository;

    @Override
    @Transactional
    public UserPrefernceDTO create(UserPrefernceDTO dto) {
        UserPrefernce entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public UserPrefernceDTO getById(Long id) {
        UserPrefernce entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("UserPrefernce not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<UserPrefernceDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UserPrefernceDTO update(Long id, UserPrefernceDTO dto) {
        UserPrefernce entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("UserPrefernce not found with ID: " + id));
        UserPrefernce mapped = mapToEntity(dto);
        mapped.setUserPrefernceId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        UserPrefernce entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("UserPrefernce not found with ID: " + id));
        repository.delete(entity);
    }

    private UserPrefernce mapToEntity(UserPrefernceDTO dto) {
        UserPrefernce entity = new UserPrefernce();
        entity.setUserPrefernceId(dto.getUserPrefernceId());
        entity.setOrgId(dto.getOrgId());
        entity.setUserId(dto.getUserId());
        entity.setModuleKey(dto.getModuleKey());
        entity.setCustomColumns(dto.getCustomColumns());
        entity.setCustomFilters(dto.getCustomFilters());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private UserPrefernceDTO mapToDTO(UserPrefernce entity) {
        UserPrefernceDTO dto = new UserPrefernceDTO();
        dto.setUserPrefernceId(entity.getUserPrefernceId());
        dto.setOrgId(entity.getOrgId());
        dto.setUserId(entity.getUserId());
        dto.setModuleKey(entity.getModuleKey());
        dto.setCustomColumns(entity.getCustomColumns());
        dto.setCustomFilters(entity.getCustomFilters());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}