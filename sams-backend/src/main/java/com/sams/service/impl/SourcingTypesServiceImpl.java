package com.sams.service.impl;

import com.sams.dto.SourcingTypesDTO;
import com.sams.entity.SourcingTypes;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SourcingTypesRepository;
import com.sams.service.SourcingTypesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SourcingTypesServiceImpl implements SourcingTypesService {

    private final SourcingTypesRepository repository;

    @Override
    @Transactional
    public SourcingTypesDTO create(SourcingTypesDTO dto) {
        SourcingTypes entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SourcingTypesDTO getById(Long id) {
        SourcingTypes entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SourcingTypes not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SourcingTypesDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SourcingTypesDTO update(Long id, SourcingTypesDTO dto) {
        SourcingTypes entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SourcingTypes not found with ID: " + id));
        SourcingTypes mapped = mapToEntity(dto);
        mapped.setSourcingTypesId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SourcingTypes entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SourcingTypes not found with ID: " + id));
        repository.delete(entity);
    }

    private SourcingTypes mapToEntity(SourcingTypesDTO dto) {
        SourcingTypes entity = new SourcingTypes();
        entity.setSourcingTypesId(dto.getSourcingTypesId());
        entity.setSourcingTypesName(dto.getSourcingTypesName());
        entity.setActive(dto.getActive());
        entity.setDisplay(dto.getDisplay());
        return entity;
    }

    private SourcingTypesDTO mapToDTO(SourcingTypes entity) {
        SourcingTypesDTO dto = new SourcingTypesDTO();
        dto.setSourcingTypesId(entity.getSourcingTypesId());
        dto.setSourcingTypesName(entity.getSourcingTypesName());
        dto.setActive(entity.getActive());
        dto.setDisplay(entity.getDisplay());
        return dto;
    }
}