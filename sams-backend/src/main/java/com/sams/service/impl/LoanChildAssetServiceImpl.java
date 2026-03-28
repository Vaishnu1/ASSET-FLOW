package com.sams.service.impl;

import com.sams.dto.LoanChildAssetDTO;
import com.sams.entity.LoanChildAsset;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.LoanChildAssetRepository;
import com.sams.service.LoanChildAssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LoanChildAssetServiceImpl implements LoanChildAssetService {

    private final LoanChildAssetRepository repository;

    @Override
    @Transactional
    public LoanChildAssetDTO create(LoanChildAssetDTO dto) {
        LoanChildAsset entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public LoanChildAssetDTO getById(Long id) {
        LoanChildAsset entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LoanChildAsset not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<LoanChildAssetDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LoanChildAssetDTO update(Long id, LoanChildAssetDTO dto) {
        LoanChildAsset entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LoanChildAsset not found with ID: " + id));
        LoanChildAsset mapped = mapToEntity(dto);
        mapped.setLoanChildAssetId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        LoanChildAsset entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LoanChildAsset not found with ID: " + id));
        repository.delete(entity);
    }

    private LoanChildAsset mapToEntity(LoanChildAssetDTO dto) {
        LoanChildAsset entity = new LoanChildAsset();
        entity.setLoanChildAssetId(dto.getLoanChildAssetId());
        entity.setOrgId(dto.getOrgId());
        entity.setLoanId(dto.getLoanId());
        entity.setChildAssetId(dto.getChildAssetId());
        entity.setAssetHdrId(dto.getAssetHdrId());
        entity.setActive(dto.getActive());
        entity.setChildAssetIssued(dto.getChildAssetIssued());
        entity.setChildAssetReturn(dto.getChildAssetReturn());
        entity.setChildAssetWrittenOf(dto.getChildAssetWrittenOf());
        entity.setChildAssetWrittenOfRemarks(dto.getChildAssetWrittenOfRemarks());
        entity.setRemarks(dto.getRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private LoanChildAssetDTO mapToDTO(LoanChildAsset entity) {
        LoanChildAssetDTO dto = new LoanChildAssetDTO();
        dto.setLoanChildAssetId(entity.getLoanChildAssetId());
        dto.setOrgId(entity.getOrgId());
        dto.setLoanId(entity.getLoanId());
        dto.setChildAssetId(entity.getChildAssetId());
        dto.setAssetHdrId(entity.getAssetHdrId());
        dto.setActive(entity.getActive());
        dto.setChildAssetIssued(entity.getChildAssetIssued());
        dto.setChildAssetReturn(entity.getChildAssetReturn());
        dto.setChildAssetWrittenOf(entity.getChildAssetWrittenOf());
        dto.setChildAssetWrittenOfRemarks(entity.getChildAssetWrittenOfRemarks());
        dto.setRemarks(entity.getRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}