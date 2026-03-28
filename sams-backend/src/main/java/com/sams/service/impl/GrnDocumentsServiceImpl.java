package com.sams.service.impl;

import com.sams.dto.GrnDocumentsDTO;
import com.sams.entity.GrnDocuments;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.GrnDocumentsRepository;
import com.sams.service.GrnDocumentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GrnDocumentsServiceImpl implements GrnDocumentsService {

    private final GrnDocumentsRepository repository;

    @Override
    @Transactional
    public GrnDocumentsDTO create(GrnDocumentsDTO dto) {
        GrnDocuments entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public GrnDocumentsDTO getById(Long id) {
        GrnDocuments entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GrnDocuments not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<GrnDocumentsDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public GrnDocumentsDTO update(Long id, GrnDocumentsDTO dto) {
        GrnDocuments entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GrnDocuments not found with ID: " + id));
        GrnDocuments mapped = mapToEntity(dto);
        mapped.setGrnDocId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        GrnDocuments entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GrnDocuments not found with ID: " + id));
        repository.delete(entity);
    }

    private GrnDocuments mapToEntity(GrnDocumentsDTO dto) {
        GrnDocuments entity = new GrnDocuments();
        entity.setGrnDocId(dto.getGrnDocId());
        entity.setGrnHdrId(dto.getGrnHdrId());
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

    private GrnDocumentsDTO mapToDTO(GrnDocuments entity) {
        GrnDocumentsDTO dto = new GrnDocumentsDTO();
        dto.setGrnDocId(entity.getGrnDocId());
        dto.setGrnHdrId(entity.getGrnHdrId());
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