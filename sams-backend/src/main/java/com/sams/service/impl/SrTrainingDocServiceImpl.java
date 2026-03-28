package com.sams.service.impl;

import com.sams.dto.SrTrainingDocDTO;
import com.sams.entity.SrTrainingDoc;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrTrainingDocRepository;
import com.sams.service.SrTrainingDocService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrTrainingDocServiceImpl implements SrTrainingDocService {

    private final SrTrainingDocRepository repository;

    @Override
    @Transactional
    public SrTrainingDocDTO create(SrTrainingDocDTO dto) {
        SrTrainingDoc entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrTrainingDocDTO getById(Long id) {
        SrTrainingDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrTrainingDoc not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrTrainingDocDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrTrainingDocDTO update(Long id, SrTrainingDocDTO dto) {
        SrTrainingDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrTrainingDoc not found with ID: " + id));
        SrTrainingDoc mapped = mapToEntity(dto);
        mapped.setSrTrainingDocId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrTrainingDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrTrainingDoc not found with ID: " + id));
        repository.delete(entity);
    }

    private SrTrainingDoc mapToEntity(SrTrainingDocDTO dto) {
        SrTrainingDoc entity = new SrTrainingDoc();
        entity.setSrTrainingDocId(dto.getSrTrainingDocId());
        entity.setOrgId(dto.getOrgId());
        entity.setSrId(dto.getSrId());
        entity.setSrTrainingId(dto.getSrTrainingId());
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

    private SrTrainingDocDTO mapToDTO(SrTrainingDoc entity) {
        SrTrainingDocDTO dto = new SrTrainingDocDTO();
        dto.setSrTrainingDocId(entity.getSrTrainingDocId());
        dto.setOrgId(entity.getOrgId());
        dto.setSrId(entity.getSrId());
        dto.setSrTrainingId(entity.getSrTrainingId());
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