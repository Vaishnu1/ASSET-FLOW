package com.sams.service.impl;

import com.sams.dto.UserSessionInfoDTO;
import com.sams.entity.UserSessionInfo;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.UserSessionInfoRepository;
import com.sams.service.UserSessionInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserSessionInfoServiceImpl implements UserSessionInfoService {

    private final UserSessionInfoRepository repository;

    @Override
    @Transactional
    public UserSessionInfoDTO create(UserSessionInfoDTO dto) {
        UserSessionInfo entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public UserSessionInfoDTO getById(Long id) {
        UserSessionInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("UserSessionInfo not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<UserSessionInfoDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UserSessionInfoDTO update(Long id, UserSessionInfoDTO dto) {
        UserSessionInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("UserSessionInfo not found with ID: " + id));
        UserSessionInfo mapped = mapToEntity(dto);
        mapped.setSessionId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        UserSessionInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("UserSessionInfo not found with ID: " + id));
        repository.delete(entity);
    }

    private UserSessionInfo mapToEntity(UserSessionInfoDTO dto) {
        UserSessionInfo entity = new UserSessionInfo();
        entity.setSessionId(dto.getSessionId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLoginId(dto.getLoginId());
        entity.setSessionIp(dto.getSessionIp());
        entity.setLoginTime(dto.getLoginTime());
        entity.setLogoutTime(dto.getLogoutTime());
        entity.setLoginResult(dto.getLoginResult());
        entity.setRemarks(dto.getRemarks());
        entity.setSessionToken(dto.getSessionToken());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private UserSessionInfoDTO mapToDTO(UserSessionInfo entity) {
        UserSessionInfoDTO dto = new UserSessionInfoDTO();
        dto.setSessionId(entity.getSessionId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLoginId(entity.getLoginId());
        dto.setSessionIp(entity.getSessionIp());
        dto.setLoginTime(entity.getLoginTime());
        dto.setLogoutTime(entity.getLogoutTime());
        dto.setLoginResult(entity.getLoginResult());
        dto.setRemarks(entity.getRemarks());
        dto.setSessionToken(entity.getSessionToken());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}