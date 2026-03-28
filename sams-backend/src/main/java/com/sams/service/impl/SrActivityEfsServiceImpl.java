package com.sams.service.impl;

import com.sams.dto.SrActivityEfsDTO;
import com.sams.entity.SrActivityEfs;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrActivityEfsRepository;
import com.sams.service.SrActivityEfsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrActivityEfsServiceImpl implements SrActivityEfsService {

    private final SrActivityEfsRepository repository;

    @Override
    @Transactional
    public SrActivityEfsDTO create(SrActivityEfsDTO dto) {
        SrActivityEfs entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrActivityEfsDTO getById(Long id) {
        SrActivityEfs entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrActivityEfs not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrActivityEfsDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrActivityEfsDTO update(Long id, SrActivityEfsDTO dto) {
        SrActivityEfs entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrActivityEfs not found with ID: " + id));
        SrActivityEfs mapped = mapToEntity(dto);
        mapped.setSrActivityEfsId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrActivityEfs entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrActivityEfs not found with ID: " + id));
        repository.delete(entity);
    }

    private SrActivityEfs mapToEntity(SrActivityEfsDTO dto) {
        SrActivityEfs entity = new SrActivityEfs();
        entity.setSrActivityEfsId(dto.getSrActivityEfsId());
        entity.setOrgId(dto.getOrgId());
        entity.setSrActivityEfsName(dto.getSrActivityEfsName());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private SrActivityEfsDTO mapToDTO(SrActivityEfs entity) {
        SrActivityEfsDTO dto = new SrActivityEfsDTO();
        dto.setSrActivityEfsId(entity.getSrActivityEfsId());
        dto.setOrgId(entity.getOrgId());
        dto.setSrActivityEfsName(entity.getSrActivityEfsName());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}