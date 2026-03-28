package com.sams.service.impl;

import com.sams.dto.DeviceCodeDTO;
import com.sams.entity.DeviceCode;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.DeviceCodeRepository;
import com.sams.service.DeviceCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DeviceCodeServiceImpl implements DeviceCodeService {

    private final DeviceCodeRepository repository;

    @Override
    @Transactional
    public DeviceCodeDTO createDeviceCode(DeviceCodeDTO dto) {
        DeviceCode entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public DeviceCodeDTO getDeviceCodeById(Long id) {
        DeviceCode entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("DeviceCode not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<DeviceCodeDTO> getAllDeviceCodes() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public DeviceCodeDTO updateDeviceCode(Long id, DeviceCodeDTO dto) {
        DeviceCode entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("DeviceCode not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        DeviceCode mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteDeviceCode(Long id) {
        DeviceCode entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("DeviceCode not found with ID: " + id));
        repository.delete(entity);
    }

    private DeviceCode mapToEntity(DeviceCodeDTO dto) {
        DeviceCode entity = new DeviceCode();
        entity.setDeviceCodeId(dto.getDeviceCodeId());
        entity.setDeviceCode(dto.getDeviceCode());
        entity.setDeviceConcept(dto.getDeviceConcept());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setOrgId(dto.getOrgId());
        return entity;
    }

    private DeviceCodeDTO mapToDTO(DeviceCode entity) {
        DeviceCodeDTO dto = new DeviceCodeDTO();
        dto.setId(entity.getId());
        dto.setDeviceCodeId(entity.getDeviceCodeId());
        dto.setDeviceCode(entity.getDeviceCode());
        dto.setDeviceConcept(entity.getDeviceConcept());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setOrgId(entity.getOrgId());
        return dto;
    }
}