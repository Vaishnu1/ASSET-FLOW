package com.sams.service.impl;

import com.sams.dto.PurchaseStatusDTO;
import com.sams.entity.PurchaseStatus;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PurchaseStatusRepository;
import com.sams.service.PurchaseStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PurchaseStatusServiceImpl implements PurchaseStatusService {

    private final PurchaseStatusRepository repository;

    @Override
    @Transactional
    public PurchaseStatusDTO create(PurchaseStatusDTO dto) {
        PurchaseStatus entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PurchaseStatusDTO getById(Long id) {
        PurchaseStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchaseStatus not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PurchaseStatusDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PurchaseStatusDTO update(Long id, PurchaseStatusDTO dto) {
        PurchaseStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchaseStatus not found with ID: " + id));
        PurchaseStatus mapped = mapToEntity(dto);
        mapped.setPurchaseStatusId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PurchaseStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchaseStatus not found with ID: " + id));
        repository.delete(entity);
    }

    private PurchaseStatus mapToEntity(PurchaseStatusDTO dto) {
        PurchaseStatus entity = new PurchaseStatus();
        entity.setPurchaseStatusId(dto.getPurchaseStatusId());
        entity.setPurchaseStatusName(dto.getPurchaseStatusName());
        entity.setSourceModule(dto.getSourceModule());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private PurchaseStatusDTO mapToDTO(PurchaseStatus entity) {
        PurchaseStatusDTO dto = new PurchaseStatusDTO();
        dto.setPurchaseStatusId(entity.getPurchaseStatusId());
        dto.setPurchaseStatusName(entity.getPurchaseStatusName());
        dto.setSourceModule(entity.getSourceModule());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}