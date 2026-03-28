package com.sams.service.impl;

import com.sams.dto.VolumeLicenseDTO;
import com.sams.entity.VolumeLicense;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.VolumeLicenseRepository;
import com.sams.service.VolumeLicenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VolumeLicenseServiceImpl implements VolumeLicenseService {

    private final VolumeLicenseRepository repository;

    @Override
    @Transactional
    public VolumeLicenseDTO create(VolumeLicenseDTO dto) {
        VolumeLicense entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public VolumeLicenseDTO getById(Long id) {
        VolumeLicense entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("VolumeLicense not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<VolumeLicenseDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public VolumeLicenseDTO update(Long id, VolumeLicenseDTO dto) {
        VolumeLicense entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("VolumeLicense not found with ID: " + id));
        VolumeLicense mapped = mapToEntity(dto);
        mapped.setVolumeLicenseId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        VolumeLicense entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("VolumeLicense not found with ID: " + id));
        repository.delete(entity);
    }

    private VolumeLicense mapToEntity(VolumeLicenseDTO dto) {
        VolumeLicense entity = new VolumeLicense();
        entity.setVolumeLicenseId(dto.getVolumeLicenseId());
        entity.setOrgId(dto.getOrgId());
        entity.setAssetHdrId(dto.getAssetHdrId());
        entity.setProductKey(dto.getProductKey());
        entity.setStatus(dto.getStatus());
        entity.setAssignedAssetId(dto.getAssignedAssetId());
        entity.setChildAssetId(dto.getChildAssetId());
        entity.setAssignedTo(dto.getAssignedTo());
        entity.setAssignedEmployeeId(dto.getAssignedEmployeeId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private VolumeLicenseDTO mapToDTO(VolumeLicense entity) {
        VolumeLicenseDTO dto = new VolumeLicenseDTO();
        dto.setVolumeLicenseId(entity.getVolumeLicenseId());
        dto.setOrgId(entity.getOrgId());
        dto.setAssetHdrId(entity.getAssetHdrId());
        dto.setProductKey(entity.getProductKey());
        dto.setStatus(entity.getStatus());
        dto.setAssignedAssetId(entity.getAssignedAssetId());
        dto.setChildAssetId(entity.getChildAssetId());
        dto.setAssignedTo(entity.getAssignedTo());
        dto.setAssignedEmployeeId(entity.getAssignedEmployeeId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}