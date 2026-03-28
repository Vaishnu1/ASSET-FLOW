package com.sams.service.impl;

import com.sams.dto.ReferenceEmailServiceDbDTO;
import com.sams.entity.ReferenceEmailServiceDb;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ReferenceEmailServiceDbRepository;
import com.sams.service.ReferenceEmailServiceDbService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReferenceEmailServiceDbServiceImpl implements ReferenceEmailServiceDbService {

    private final ReferenceEmailServiceDbRepository repository;

    @Override
    @Transactional
    public ReferenceEmailServiceDbDTO create(ReferenceEmailServiceDbDTO dto) {
        ReferenceEmailServiceDb entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ReferenceEmailServiceDbDTO getById(Long id) {
        ReferenceEmailServiceDb entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ReferenceEmailServiceDb not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ReferenceEmailServiceDbDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ReferenceEmailServiceDbDTO update(Long id, ReferenceEmailServiceDbDTO dto) {
        ReferenceEmailServiceDb entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ReferenceEmailServiceDb not found with ID: " + id));
        ReferenceEmailServiceDb mapped = mapToEntity(dto);
        mapped.setRefEsDbId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ReferenceEmailServiceDb entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ReferenceEmailServiceDb not found with ID: " + id));
        repository.delete(entity);
    }

    private ReferenceEmailServiceDb mapToEntity(ReferenceEmailServiceDbDTO dto) {
        ReferenceEmailServiceDb entity = new ReferenceEmailServiceDb();
        entity.setRefEsDbId(dto.getRefEsDbId());
        entity.setEsDbName(dto.getEsDbName());
        entity.setEsDbPort(dto.getEsDbPort());
        entity.setEsDbUsername(dto.getEsDbUsername());
        entity.setEsDbPassword(dto.getEsDbPassword());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ReferenceEmailServiceDbDTO mapToDTO(ReferenceEmailServiceDb entity) {
        ReferenceEmailServiceDbDTO dto = new ReferenceEmailServiceDbDTO();
        dto.setRefEsDbId(entity.getRefEsDbId());
        dto.setEsDbName(entity.getEsDbName());
        dto.setEsDbPort(entity.getEsDbPort());
        dto.setEsDbUsername(entity.getEsDbUsername());
        dto.setEsDbPassword(entity.getEsDbPassword());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}