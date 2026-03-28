package com.sams.service.impl;

import com.sams.dto.SrStatusDTO;
import com.sams.entity.SrStatus;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrStatusRepository;
import com.sams.service.SrStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrStatusServiceImpl implements SrStatusService {

    private final SrStatusRepository repository;

    @Override
    @Transactional
    public SrStatusDTO create(SrStatusDTO dto) {
        SrStatus entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrStatusDTO getById(Long id) {
        SrStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrStatus not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrStatusDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrStatusDTO update(Long id, SrStatusDTO dto) {
        SrStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrStatus not found with ID: " + id));
        SrStatus mapped = mapToEntity(dto);
        mapped.setSrStatusId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrStatus not found with ID: " + id));
        repository.delete(entity);
    }

    private SrStatus mapToEntity(SrStatusDTO dto) {
        SrStatus entity = new SrStatus();
        entity.setSrStatusId(dto.getSrStatusId());
        entity.setSrId(dto.getSrId());
        entity.setSrActivityId(dto.getSrActivityId());
        entity.setSrStatus(dto.getSrStatus());
        entity.setLatitude(dto.getLatitude());
        entity.setLongitude(dto.getLongitude());
        entity.setAddress(dto.getAddress());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private SrStatusDTO mapToDTO(SrStatus entity) {
        SrStatusDTO dto = new SrStatusDTO();
        dto.setSrStatusId(entity.getSrStatusId());
        dto.setSrId(entity.getSrId());
        dto.setSrActivityId(entity.getSrActivityId());
        dto.setSrStatus(entity.getSrStatus());
        dto.setLatitude(entity.getLatitude());
        dto.setLongitude(entity.getLongitude());
        dto.setAddress(entity.getAddress());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}