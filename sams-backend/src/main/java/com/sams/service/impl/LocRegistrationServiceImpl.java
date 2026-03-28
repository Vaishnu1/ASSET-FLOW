package com.sams.service.impl;

import com.sams.dto.LocRegistrationDTO;
import com.sams.entity.LocRegistration;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.LocRegistrationRepository;
import com.sams.service.LocRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocRegistrationServiceImpl implements LocRegistrationService {

    private final LocRegistrationRepository repository;

    @Override
    @Transactional
    public LocRegistrationDTO create(LocRegistrationDTO dto) {
        LocRegistration entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public LocRegistrationDTO getById(Long id) {
        LocRegistration entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocRegistration not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<LocRegistrationDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LocRegistrationDTO update(Long id, LocRegistrationDTO dto) {
        LocRegistration entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocRegistration not found with ID: " + id));
        LocRegistration mapped = mapToEntity(dto);
        mapped.setLocRegistrationId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        LocRegistration entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocRegistration not found with ID: " + id));
        repository.delete(entity);
    }

    private LocRegistration mapToEntity(LocRegistrationDTO dto) {
        LocRegistration entity = new LocRegistration();
        entity.setLocRegistrationId(dto.getLocRegistrationId());
        entity.setRegistrationName(dto.getRegistrationName());
        entity.setRegistrationNo(dto.getRegistrationNo());
        entity.setLocationId(dto.getLocationId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private LocRegistrationDTO mapToDTO(LocRegistration entity) {
        LocRegistrationDTO dto = new LocRegistrationDTO();
        dto.setLocRegistrationId(entity.getLocRegistrationId());
        dto.setRegistrationName(entity.getRegistrationName());
        dto.setRegistrationNo(entity.getRegistrationNo());
        dto.setLocationId(entity.getLocationId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}