package com.sams.service.impl;

import com.sams.dto.InstallationTypeDTO;
import com.sams.entity.InstallationType;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.InstallationTypeRepository;
import com.sams.service.InstallationTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InstallationTypeServiceImpl implements InstallationTypeService {

    private final InstallationTypeRepository repository;

    @Override
    @Transactional
    public InstallationTypeDTO create(InstallationTypeDTO dto) {
        InstallationType entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public InstallationTypeDTO getById(Long id) {
        InstallationType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("InstallationType not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<InstallationTypeDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public InstallationTypeDTO update(Long id, InstallationTypeDTO dto) {
        InstallationType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("InstallationType not found with ID: " + id));
        InstallationType mapped = mapToEntity(dto);
        mapped.setInstallationTypeId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        InstallationType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("InstallationType not found with ID: " + id));
        repository.delete(entity);
    }

    private InstallationType mapToEntity(InstallationTypeDTO dto) {
        InstallationType entity = new InstallationType();
        entity.setInstallationTypeId(dto.getInstallationTypeId());
        entity.setOrgId(dto.getOrgId());
        entity.setInstallationType(dto.getInstallationType());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private InstallationTypeDTO mapToDTO(InstallationType entity) {
        InstallationTypeDTO dto = new InstallationTypeDTO();
        dto.setInstallationTypeId(entity.getInstallationTypeId());
        dto.setOrgId(entity.getOrgId());
        dto.setInstallationType(entity.getInstallationType());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}