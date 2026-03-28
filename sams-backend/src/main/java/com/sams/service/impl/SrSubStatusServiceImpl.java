package com.sams.service.impl;

import com.sams.dto.SrSubStatusDTO;
import com.sams.entity.SrSubStatus;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrSubStatusRepository;
import com.sams.service.SrSubStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrSubStatusServiceImpl implements SrSubStatusService {

    private final SrSubStatusRepository repository;

    @Override
    @Transactional
    public SrSubStatusDTO create(SrSubStatusDTO dto) {
        SrSubStatus entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrSubStatusDTO getById(Long id) {
        SrSubStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrSubStatus not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrSubStatusDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrSubStatusDTO update(Long id, SrSubStatusDTO dto) {
        SrSubStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrSubStatus not found with ID: " + id));
        SrSubStatus mapped = mapToEntity(dto);
        mapped.setSrSubStatusId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrSubStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrSubStatus not found with ID: " + id));
        repository.delete(entity);
    }

    private SrSubStatus mapToEntity(SrSubStatusDTO dto) {
        SrSubStatus entity = new SrSubStatus();
        entity.setSrSubStatusId(dto.getSrSubStatusId());
        entity.setOrgId(dto.getOrgId());
        entity.setSrSubStatusName(dto.getSrSubStatusName());
        entity.setModuleRef(dto.getModuleRef());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private SrSubStatusDTO mapToDTO(SrSubStatus entity) {
        SrSubStatusDTO dto = new SrSubStatusDTO();
        dto.setSrSubStatusId(entity.getSrSubStatusId());
        dto.setOrgId(entity.getOrgId());
        dto.setSrSubStatusName(entity.getSrSubStatusName());
        dto.setModuleRef(entity.getModuleRef());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}