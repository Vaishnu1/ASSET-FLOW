package com.sams.service.impl;

import com.sams.dto.PurchasingUsageDTO;
import com.sams.entity.PurchasingUsage;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PurchasingUsageRepository;
import com.sams.service.PurchasingUsageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PurchasingUsageServiceImpl implements PurchasingUsageService {

    private final PurchasingUsageRepository repository;

    @Override
    @Transactional
    public PurchasingUsageDTO create(PurchasingUsageDTO dto) {
        PurchasingUsage entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PurchasingUsageDTO getById(Long id) {
        PurchasingUsage entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchasingUsage not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PurchasingUsageDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PurchasingUsageDTO update(Long id, PurchasingUsageDTO dto) {
        PurchasingUsage entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchasingUsage not found with ID: " + id));
        PurchasingUsage mapped = mapToEntity(dto);
        mapped.setPurchasingUsageId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PurchasingUsage entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchasingUsage not found with ID: " + id));
        repository.delete(entity);
    }

    private PurchasingUsage mapToEntity(PurchasingUsageDTO dto) {
        PurchasingUsage entity = new PurchasingUsage();
        entity.setPurchasingUsageId(dto.getPurchasingUsageId());
        entity.setOrgId(dto.getOrgId());
        entity.setPurchasingUsageName(dto.getPurchasingUsageName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private PurchasingUsageDTO mapToDTO(PurchasingUsage entity) {
        PurchasingUsageDTO dto = new PurchasingUsageDTO();
        dto.setPurchasingUsageId(entity.getPurchasingUsageId());
        dto.setOrgId(entity.getOrgId());
        dto.setPurchasingUsageName(entity.getPurchasingUsageName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}