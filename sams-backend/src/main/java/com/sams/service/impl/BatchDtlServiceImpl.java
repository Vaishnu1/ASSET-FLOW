package com.sams.service.impl;

import com.sams.dto.BatchDtlDTO;
import com.sams.entity.BatchDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.BatchDtlRepository;
import com.sams.service.BatchDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BatchDtlServiceImpl implements BatchDtlService {

    private final BatchDtlRepository repository;

    @Override
    @Transactional
    public BatchDtlDTO create(BatchDtlDTO dto) {
        BatchDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public BatchDtlDTO getById(Long id) {
        BatchDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BatchDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<BatchDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BatchDtlDTO update(Long id, BatchDtlDTO dto) {
        BatchDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BatchDtl not found with ID: " + id));
        BatchDtl mapped = mapToEntity(dto);
        mapped.setBatchDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        BatchDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BatchDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private BatchDtl mapToEntity(BatchDtlDTO dto) {
        BatchDtl entity = new BatchDtl();
        entity.setBatchDtlId(dto.getBatchDtlId());
        entity.setAssetId(dto.getAssetId());
        entity.setBatchHdrId(dto.getBatchHdrId());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private BatchDtlDTO mapToDTO(BatchDtl entity) {
        BatchDtlDTO dto = new BatchDtlDTO();
        dto.setBatchDtlId(entity.getBatchDtlId());
        dto.setAssetId(entity.getAssetId());
        dto.setBatchHdrId(entity.getBatchHdrId());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}