package com.sams.service.impl;

import com.sams.dto.StockIndentHdrDTO;
import com.sams.entity.StockIndentHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.StockIndentHdrRepository;
import com.sams.service.StockIndentHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StockIndentHdrServiceImpl implements StockIndentHdrService {

    private final StockIndentHdrRepository repository;

    @Override
    @Transactional
    public StockIndentHdrDTO create(StockIndentHdrDTO dto) {
        StockIndentHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public StockIndentHdrDTO getById(Long id) {
        StockIndentHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StockIndentHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<StockIndentHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StockIndentHdrDTO update(Long id, StockIndentHdrDTO dto) {
        StockIndentHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StockIndentHdr not found with ID: " + id));
        StockIndentHdr mapped = mapToEntity(dto);
        mapped.setIndentHdrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        StockIndentHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StockIndentHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private StockIndentHdr mapToEntity(StockIndentHdrDTO dto) {
        StockIndentHdr entity = new StockIndentHdr();
        entity.setIndentHdrId(dto.getIndentHdrId());
        entity.setIndentNo(dto.getIndentNo());
        entity.setIndentDt(dto.getIndentDt());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setRequestedById(dto.getRequestedById());
        entity.setProcessedFlg(dto.getProcessedFlg());
        entity.setRequestedBy(dto.getRequestedBy());
        entity.setRequestedDt(dto.getRequestedDt());
        entity.setIndentStatus(dto.getIndentStatus());
        entity.setSrId(dto.getSrId());
        entity.setSrNo(dto.getSrNo());
        entity.setSrActivityId(dto.getSrActivityId());
        entity.setStoreId(dto.getStoreId());
        entity.setStoreName(dto.getStoreName());
        entity.setAssetId(dto.getAssetId());
        entity.setAssetCode(dto.getAssetCode());
        entity.setErrorFlg(dto.getErrorFlg());
        entity.setErrorMessage(dto.getErrorMessage());
        entity.setApprovedBy(dto.getApprovedBy());
        entity.setApprovedDt(dto.getApprovedDt());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private StockIndentHdrDTO mapToDTO(StockIndentHdr entity) {
        StockIndentHdrDTO dto = new StockIndentHdrDTO();
        dto.setIndentHdrId(entity.getIndentHdrId());
        dto.setIndentNo(entity.getIndentNo());
        dto.setIndentDt(entity.getIndentDt());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setRequestedById(entity.getRequestedById());
        dto.setProcessedFlg(entity.getProcessedFlg());
        dto.setRequestedBy(entity.getRequestedBy());
        dto.setRequestedDt(entity.getRequestedDt());
        dto.setIndentStatus(entity.getIndentStatus());
        dto.setSrId(entity.getSrId());
        dto.setSrNo(entity.getSrNo());
        dto.setSrActivityId(entity.getSrActivityId());
        dto.setStoreId(entity.getStoreId());
        dto.setStoreName(entity.getStoreName());
        dto.setAssetId(entity.getAssetId());
        dto.setAssetCode(entity.getAssetCode());
        dto.setErrorFlg(entity.getErrorFlg());
        dto.setErrorMessage(entity.getErrorMessage());
        dto.setApprovedBy(entity.getApprovedBy());
        dto.setApprovedDt(entity.getApprovedDt());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}