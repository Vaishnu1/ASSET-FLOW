package com.sams.service.impl;

import com.sams.dto.StockTransferHdrDTO;
import com.sams.entity.StockTransferHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.StockTransferHdrRepository;
import com.sams.service.StockTransferHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StockTransferHdrServiceImpl implements StockTransferHdrService {

    private final StockTransferHdrRepository repository;

    @Override
    @Transactional
    public StockTransferHdrDTO create(StockTransferHdrDTO dto) {
        StockTransferHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public StockTransferHdrDTO getById(Long id) {
        StockTransferHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StockTransferHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<StockTransferHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StockTransferHdrDTO update(Long id, StockTransferHdrDTO dto) {
        StockTransferHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StockTransferHdr not found with ID: " + id));
        StockTransferHdr mapped = mapToEntity(dto);
        mapped.setStockTransferHdrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        StockTransferHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StockTransferHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private StockTransferHdr mapToEntity(StockTransferHdrDTO dto) {
        StockTransferHdr entity = new StockTransferHdr();
        entity.setStockTransferHdrId(dto.getStockTransferHdrId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setStockTransferNo(dto.getStockTransferNo());
        entity.setFromStoreId(dto.getFromStoreId());
        entity.setToStoreId(dto.getToStoreId());
        entity.setFromAssetId(dto.getFromAssetId());
        entity.setToAssetId(dto.getToAssetId());
        entity.setStockTransferType(dto.getStockTransferType());
        entity.setStockTransferStatus(dto.getStockTransferStatus());
        entity.setAssetStatusId(dto.getAssetStatusId());
        entity.setSourceScreen(dto.getSourceScreen());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private StockTransferHdrDTO mapToDTO(StockTransferHdr entity) {
        StockTransferHdrDTO dto = new StockTransferHdrDTO();
        dto.setStockTransferHdrId(entity.getStockTransferHdrId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setStockTransferNo(entity.getStockTransferNo());
        dto.setFromStoreId(entity.getFromStoreId());
        dto.setToStoreId(entity.getToStoreId());
        dto.setFromAssetId(entity.getFromAssetId());
        dto.setToAssetId(entity.getToAssetId());
        dto.setStockTransferType(entity.getStockTransferType());
        dto.setStockTransferStatus(entity.getStockTransferStatus());
        dto.setAssetStatusId(entity.getAssetStatusId());
        dto.setSourceScreen(entity.getSourceScreen());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}