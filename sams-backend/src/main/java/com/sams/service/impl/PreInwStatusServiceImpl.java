package com.sams.service.impl;

import com.sams.dto.PreInwStatusDTO;
import com.sams.entity.PreInwStatus;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PreInwStatusRepository;
import com.sams.service.PreInwStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PreInwStatusServiceImpl implements PreInwStatusService {

    private final PreInwStatusRepository repository;

    @Override
    @Transactional
    public PreInwStatusDTO create(PreInwStatusDTO dto) {
        PreInwStatus entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PreInwStatusDTO getById(Long id) {
        PreInwStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PreInwStatus not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PreInwStatusDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PreInwStatusDTO update(Long id, PreInwStatusDTO dto) {
        PreInwStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PreInwStatus not found with ID: " + id));
        PreInwStatus mapped = mapToEntity(dto);
        mapped.setPreInwStatusId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PreInwStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PreInwStatus not found with ID: " + id));
        repository.delete(entity);
    }

    private PreInwStatus mapToEntity(PreInwStatusDTO dto) {
        PreInwStatus entity = new PreInwStatus();
        entity.setPreInwStatusId(dto.getPreInwStatusId());
        entity.setPreInwStatusCode(dto.getPreInwStatusCode());
        entity.setPreInwStatusDesc(dto.getPreInwStatusDesc());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private PreInwStatusDTO mapToDTO(PreInwStatus entity) {
        PreInwStatusDTO dto = new PreInwStatusDTO();
        dto.setPreInwStatusId(entity.getPreInwStatusId());
        dto.setPreInwStatusCode(entity.getPreInwStatusCode());
        dto.setPreInwStatusDesc(entity.getPreInwStatusDesc());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}