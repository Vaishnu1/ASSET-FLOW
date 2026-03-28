package com.sams.service.impl;

import com.sams.dto.StatusTypeDTO;
import com.sams.entity.StatusType;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.StatusTypeRepository;
import com.sams.service.StatusTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatusTypeServiceImpl implements StatusTypeService {

    private final StatusTypeRepository repository;

    @Override
    @Transactional
    public StatusTypeDTO create(StatusTypeDTO dto) {
        StatusType entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public StatusTypeDTO getById(Long id) {
        StatusType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StatusType not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<StatusTypeDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StatusTypeDTO update(Long id, StatusTypeDTO dto) {
        StatusType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StatusType not found with ID: " + id));
        StatusType mapped = mapToEntity(dto);
        mapped.setStatusTypeId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        StatusType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StatusType not found with ID: " + id));
        repository.delete(entity);
    }

    private StatusType mapToEntity(StatusTypeDTO dto) {
        StatusType entity = new StatusType();
        entity.setStatusTypeId(dto.getStatusTypeId());
        entity.setStatusTypeName(dto.getStatusTypeName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private StatusTypeDTO mapToDTO(StatusType entity) {
        StatusTypeDTO dto = new StatusTypeDTO();
        dto.setStatusTypeId(entity.getStatusTypeId());
        dto.setStatusTypeName(entity.getStatusTypeName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}