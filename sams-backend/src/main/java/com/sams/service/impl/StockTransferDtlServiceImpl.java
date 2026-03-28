package com.sams.service.impl;

import com.sams.dto.StockTransferDtlDTO;
import com.sams.entity.StockTransferDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.StockTransferDtlRepository;
import com.sams.service.StockTransferDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StockTransferDtlServiceImpl implements StockTransferDtlService {

    private final StockTransferDtlRepository repository;

    @Override
    @Transactional
    public StockTransferDtlDTO create(StockTransferDtlDTO dto) {
        StockTransferDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public StockTransferDtlDTO getById(Long id) {
        StockTransferDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StockTransferDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<StockTransferDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StockTransferDtlDTO update(Long id, StockTransferDtlDTO dto) {
        StockTransferDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StockTransferDtl not found with ID: " + id));
        StockTransferDtl mapped = mapToEntity(dto);
        mapped.setStockTransferDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        StockTransferDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StockTransferDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private StockTransferDtl mapToEntity(StockTransferDtlDTO dto) {
        StockTransferDtl entity = new StockTransferDtl();
        entity.setStockTransferDtlId(dto.getStockTransferDtlId());
        entity.setStockTransferHdrId(dto.getStockTransferHdrId());
        entity.setItemTypeId(dto.getItemTypeId());
        entity.setItemTypeName(dto.getItemTypeName());
        entity.setItemId(dto.getItemId());
        entity.setAvailableQty(dto.getAvailableQty());
        entity.setTransferQty(dto.getTransferQty());
        entity.setIssueQty(dto.getIssueQty());
        entity.setConsumedQty(dto.getConsumedQty());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private StockTransferDtlDTO mapToDTO(StockTransferDtl entity) {
        StockTransferDtlDTO dto = new StockTransferDtlDTO();
        dto.setStockTransferDtlId(entity.getStockTransferDtlId());
        dto.setStockTransferHdrId(entity.getStockTransferHdrId());
        dto.setItemTypeId(entity.getItemTypeId());
        dto.setItemTypeName(entity.getItemTypeName());
        dto.setItemId(entity.getItemId());
        dto.setAvailableQty(entity.getAvailableQty());
        dto.setTransferQty(entity.getTransferQty());
        dto.setIssueQty(entity.getIssueQty());
        dto.setConsumedQty(entity.getConsumedQty());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}