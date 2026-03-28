package com.sams.service.impl;

import com.sams.dto.SrActivityFindingsDTO;
import com.sams.entity.SrActivityFindings;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrActivityFindingsRepository;
import com.sams.service.SrActivityFindingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrActivityFindingsServiceImpl implements SrActivityFindingsService {

    private final SrActivityFindingsRepository repository;

    @Override
    @Transactional
    public SrActivityFindingsDTO create(SrActivityFindingsDTO dto) {
        SrActivityFindings entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrActivityFindingsDTO getById(Long id) {
        SrActivityFindings entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrActivityFindings not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrActivityFindingsDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrActivityFindingsDTO update(Long id, SrActivityFindingsDTO dto) {
        SrActivityFindings entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrActivityFindings not found with ID: " + id));
        SrActivityFindings mapped = mapToEntity(dto);
        mapped.setSrActivityFindingsId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrActivityFindings entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrActivityFindings not found with ID: " + id));
        repository.delete(entity);
    }

    private SrActivityFindings mapToEntity(SrActivityFindingsDTO dto) {
        SrActivityFindings entity = new SrActivityFindings();
        entity.setSrActivityFindingsId(dto.getSrActivityFindingsId());
        entity.setOrgId(dto.getOrgId());
        entity.setSrActivityFindingsName(dto.getSrActivityFindingsName());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private SrActivityFindingsDTO mapToDTO(SrActivityFindings entity) {
        SrActivityFindingsDTO dto = new SrActivityFindingsDTO();
        dto.setSrActivityFindingsId(entity.getSrActivityFindingsId());
        dto.setOrgId(entity.getOrgId());
        dto.setSrActivityFindingsName(entity.getSrActivityFindingsName());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}