package com.sams.service.impl;

import com.sams.dto.SrActivityCorrectActionsDTO;
import com.sams.entity.SrActivityCorrectActions;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrActivityCorrectActionsRepository;
import com.sams.service.SrActivityCorrectActionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrActivityCorrectActionsServiceImpl implements SrActivityCorrectActionsService {

    private final SrActivityCorrectActionsRepository repository;

    @Override
    @Transactional
    public SrActivityCorrectActionsDTO create(SrActivityCorrectActionsDTO dto) {
        SrActivityCorrectActions entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrActivityCorrectActionsDTO getById(Long id) {
        SrActivityCorrectActions entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrActivityCorrectActions not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrActivityCorrectActionsDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrActivityCorrectActionsDTO update(Long id, SrActivityCorrectActionsDTO dto) {
        SrActivityCorrectActions entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrActivityCorrectActions not found with ID: " + id));
        SrActivityCorrectActions mapped = mapToEntity(dto);
        mapped.setSrActivityCorrectActionsId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrActivityCorrectActions entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrActivityCorrectActions not found with ID: " + id));
        repository.delete(entity);
    }

    private SrActivityCorrectActions mapToEntity(SrActivityCorrectActionsDTO dto) {
        SrActivityCorrectActions entity = new SrActivityCorrectActions();
        entity.setSrActivityCorrectActionsId(dto.getSrActivityCorrectActionsId());
        entity.setOrgId(dto.getOrgId());
        entity.setSrActivityCorrectActionsName(dto.getSrActivityCorrectActionsName());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private SrActivityCorrectActionsDTO mapToDTO(SrActivityCorrectActions entity) {
        SrActivityCorrectActionsDTO dto = new SrActivityCorrectActionsDTO();
        dto.setSrActivityCorrectActionsId(entity.getSrActivityCorrectActionsId());
        dto.setOrgId(entity.getOrgId());
        dto.setSrActivityCorrectActionsName(entity.getSrActivityCorrectActionsName());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}