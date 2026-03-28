package com.sams.service.impl;

import com.sams.dto.SrActivityDocDTO;
import com.sams.entity.SrActivityDoc;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrActivityDocRepository;
import com.sams.service.SrActivityDocService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrActivityDocServiceImpl implements SrActivityDocService {

    private final SrActivityDocRepository repository;

    @Override
    @Transactional
    public SrActivityDocDTO create(SrActivityDocDTO dto) {
        SrActivityDoc entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrActivityDocDTO getById(Long id) {
        SrActivityDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrActivityDoc not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrActivityDocDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrActivityDocDTO update(Long id, SrActivityDocDTO dto) {
        SrActivityDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrActivityDoc not found with ID: " + id));
        SrActivityDoc mapped = mapToEntity(dto);
        mapped.setSrActivityDocId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrActivityDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrActivityDoc not found with ID: " + id));
        repository.delete(entity);
    }

    private SrActivityDoc mapToEntity(SrActivityDocDTO dto) {
        SrActivityDoc entity = new SrActivityDoc();
        entity.setSrActivityDocId(dto.getSrActivityDocId());
        entity.setOrgId(dto.getOrgId());
        entity.setSrId(dto.getSrId());
        entity.setSrActivityId(dto.getSrActivityId());
        entity.setDocName(dto.getDocName());
        entity.setDocType(dto.getDocType());
        entity.setFilePath(dto.getFilePath());
        entity.setContentType(dto.getContentType());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SrActivityDocDTO mapToDTO(SrActivityDoc entity) {
        SrActivityDocDTO dto = new SrActivityDocDTO();
        dto.setSrActivityDocId(entity.getSrActivityDocId());
        dto.setOrgId(entity.getOrgId());
        dto.setSrId(entity.getSrId());
        dto.setSrActivityId(entity.getSrActivityId());
        dto.setDocName(entity.getDocName());
        dto.setDocType(entity.getDocType());
        dto.setFilePath(entity.getFilePath());
        dto.setContentType(entity.getContentType());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}