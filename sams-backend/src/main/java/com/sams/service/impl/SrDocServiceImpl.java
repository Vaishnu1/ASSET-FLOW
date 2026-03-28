package com.sams.service.impl;

import com.sams.dto.SrDocDTO;
import com.sams.entity.SrDoc;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrDocRepository;
import com.sams.service.SrDocService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrDocServiceImpl implements SrDocService {

    private final SrDocRepository repository;

    @Override
    @Transactional
    public SrDocDTO create(SrDocDTO dto) {
        SrDoc entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrDocDTO getById(Long id) {
        SrDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrDoc not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrDocDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrDocDTO update(Long id, SrDocDTO dto) {
        SrDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrDoc not found with ID: " + id));
        SrDoc mapped = mapToEntity(dto);
        mapped.setSrDocId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrDoc not found with ID: " + id));
        repository.delete(entity);
    }

    private SrDoc mapToEntity(SrDocDTO dto) {
        SrDoc entity = new SrDoc();
        entity.setSrDocId(dto.getSrDocId());
        entity.setOrgId(dto.getOrgId());
        entity.setSrId(dto.getSrId());
        entity.setDocName(dto.getDocName());
        entity.setDocType(dto.getDocType());
        entity.setFilePath(dto.getFilePath());
        entity.setContentType(dto.getContentType());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SrDocDTO mapToDTO(SrDoc entity) {
        SrDocDTO dto = new SrDocDTO();
        dto.setSrDocId(entity.getSrDocId());
        dto.setOrgId(entity.getOrgId());
        dto.setSrId(entity.getSrId());
        dto.setDocName(entity.getDocName());
        dto.setDocType(entity.getDocType());
        dto.setFilePath(entity.getFilePath());
        dto.setContentType(entity.getContentType());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}