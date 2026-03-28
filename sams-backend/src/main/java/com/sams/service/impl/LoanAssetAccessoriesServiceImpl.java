package com.sams.service.impl;

import com.sams.dto.LoanAssetAccessoriesDTO;
import com.sams.entity.LoanAssetAccessories;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.LoanAssetAccessoriesRepository;
import com.sams.service.LoanAssetAccessoriesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LoanAssetAccessoriesServiceImpl implements LoanAssetAccessoriesService {

    private final LoanAssetAccessoriesRepository repository;

    @Override
    @Transactional
    public LoanAssetAccessoriesDTO create(LoanAssetAccessoriesDTO dto) {
        LoanAssetAccessories entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public LoanAssetAccessoriesDTO getById(Long id) {
        LoanAssetAccessories entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LoanAssetAccessories not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<LoanAssetAccessoriesDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LoanAssetAccessoriesDTO update(Long id, LoanAssetAccessoriesDTO dto) {
        LoanAssetAccessories entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LoanAssetAccessories not found with ID: " + id));
        LoanAssetAccessories mapped = mapToEntity(dto);
        mapped.setLoanAssetAccessoriesId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        LoanAssetAccessories entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LoanAssetAccessories not found with ID: " + id));
        repository.delete(entity);
    }

    private LoanAssetAccessories mapToEntity(LoanAssetAccessoriesDTO dto) {
        LoanAssetAccessories entity = new LoanAssetAccessories();
        entity.setLoanAssetAccessoriesId(dto.getLoanAssetAccessoriesId());
        entity.setOrgId(dto.getOrgId());
        entity.setLoanId(dto.getLoanId());
        entity.setAssetHdrId(dto.getAssetHdrId());
        entity.setModelItemId(dto.getModelItemId());
        entity.setAccessoriesIssued(dto.getAccessoriesIssued());
        entity.setAccessoriesReturned(dto.getAccessoriesReturned());
        entity.setAccessoriesWrittenOf(dto.getAccessoriesWrittenOf());
        entity.setAccessoriesWrittenOfRemarks(dto.getAccessoriesWrittenOfRemarks());
        entity.setRemarks(dto.getRemarks());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private LoanAssetAccessoriesDTO mapToDTO(LoanAssetAccessories entity) {
        LoanAssetAccessoriesDTO dto = new LoanAssetAccessoriesDTO();
        dto.setLoanAssetAccessoriesId(entity.getLoanAssetAccessoriesId());
        dto.setOrgId(entity.getOrgId());
        dto.setLoanId(entity.getLoanId());
        dto.setAssetHdrId(entity.getAssetHdrId());
        dto.setModelItemId(entity.getModelItemId());
        dto.setAccessoriesIssued(entity.getAccessoriesIssued());
        dto.setAccessoriesReturned(entity.getAccessoriesReturned());
        dto.setAccessoriesWrittenOf(entity.getAccessoriesWrittenOf());
        dto.setAccessoriesWrittenOfRemarks(entity.getAccessoriesWrittenOfRemarks());
        dto.setRemarks(entity.getRemarks());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}