package com.sams.service.impl;

import com.sams.dto.BatchHdrDTO;
import com.sams.entity.BatchHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.BatchHdrRepository;
import com.sams.service.BatchHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BatchHdrServiceImpl implements BatchHdrService {

    private final BatchHdrRepository repository;

    @Override
    @Transactional
    public BatchHdrDTO create(BatchHdrDTO dto) {
        BatchHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public BatchHdrDTO getById(Long id) {
        BatchHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BatchHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<BatchHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BatchHdrDTO update(Long id, BatchHdrDTO dto) {
        BatchHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BatchHdr not found with ID: " + id));
        BatchHdr mapped = mapToEntity(dto);
        mapped.setBatchHdrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        BatchHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BatchHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private BatchHdr mapToEntity(BatchHdrDTO dto) {
        BatchHdr entity = new BatchHdr();
        entity.setBatchHdrId(dto.getBatchHdrId());
        entity.setOrgId(dto.getOrgId());
        entity.setBatchName(dto.getBatchName());
        entity.setReference1(dto.getReference1());
        entity.setReference2(dto.getReference2());
        entity.setRemarks(dto.getRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setActive(dto.getActive());
        return entity;
    }

    private BatchHdrDTO mapToDTO(BatchHdr entity) {
        BatchHdrDTO dto = new BatchHdrDTO();
        dto.setBatchHdrId(entity.getBatchHdrId());
        dto.setOrgId(entity.getOrgId());
        dto.setBatchName(entity.getBatchName());
        dto.setReference1(entity.getReference1());
        dto.setReference2(entity.getReference2());
        dto.setRemarks(entity.getRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setActive(entity.getActive());
        return dto;
    }
}