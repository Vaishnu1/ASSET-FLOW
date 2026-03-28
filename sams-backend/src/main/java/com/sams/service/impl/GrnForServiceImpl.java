package com.sams.service.impl;

import com.sams.dto.GrnForDTO;
import com.sams.entity.GrnFor;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.GrnForRepository;
import com.sams.service.GrnForService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GrnForServiceImpl implements GrnForService {

    private final GrnForRepository repository;

    @Override
    @Transactional
    public GrnForDTO create(GrnForDTO dto) {
        GrnFor entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public GrnForDTO getById(Long id) {
        GrnFor entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GrnFor not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<GrnForDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public GrnForDTO update(Long id, GrnForDTO dto) {
        GrnFor entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GrnFor not found with ID: " + id));
        GrnFor mapped = mapToEntity(dto);
        mapped.setGrnForId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        GrnFor entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GrnFor not found with ID: " + id));
        repository.delete(entity);
    }

    private GrnFor mapToEntity(GrnForDTO dto) {
        GrnFor entity = new GrnFor();
        entity.setGrnForId(dto.getGrnForId());
        entity.setOrgId(dto.getOrgId());
        entity.setGrnFor(dto.getGrnFor());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private GrnForDTO mapToDTO(GrnFor entity) {
        GrnForDTO dto = new GrnForDTO();
        dto.setGrnForId(entity.getGrnForId());
        dto.setOrgId(entity.getOrgId());
        dto.setGrnFor(entity.getGrnFor());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}