package com.sams.service.impl;

import com.sams.dto.GatePassPurposeDTO;
import com.sams.entity.GatePassPurpose;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.GatePassPurposeRepository;
import com.sams.service.GatePassPurposeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GatePassPurposeServiceImpl implements GatePassPurposeService {

    private final GatePassPurposeRepository repository;

    @Override
    @Transactional
    public GatePassPurposeDTO create(GatePassPurposeDTO dto) {
        GatePassPurpose entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public GatePassPurposeDTO getById(Long id) {
        GatePassPurpose entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GatePassPurpose not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<GatePassPurposeDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public GatePassPurposeDTO update(Long id, GatePassPurposeDTO dto) {
        GatePassPurpose entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GatePassPurpose not found with ID: " + id));
        GatePassPurpose mapped = mapToEntity(dto);
        mapped.setGatePassPurposeId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        GatePassPurpose entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GatePassPurpose not found with ID: " + id));
        repository.delete(entity);
    }

    private GatePassPurpose mapToEntity(GatePassPurposeDTO dto) {
        GatePassPurpose entity = new GatePassPurpose();
        entity.setGatePassPurposeId(dto.getGatePassPurposeId());
        entity.setOrgId(dto.getOrgId());
        entity.setPurposeName(dto.getPurposeName());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private GatePassPurposeDTO mapToDTO(GatePassPurpose entity) {
        GatePassPurposeDTO dto = new GatePassPurposeDTO();
        dto.setGatePassPurposeId(entity.getGatePassPurposeId());
        dto.setOrgId(entity.getOrgId());
        dto.setPurposeName(entity.getPurposeName());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}