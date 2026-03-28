package com.sams.service.impl;

import com.sams.dto.StockIndentDtlDTO;
import com.sams.entity.StockIndentDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.StockIndentDtlRepository;
import com.sams.service.StockIndentDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StockIndentDtlServiceImpl implements StockIndentDtlService {

    private final StockIndentDtlRepository repository;

    @Override
    @Transactional
    public StockIndentDtlDTO create(StockIndentDtlDTO dto) {
        StockIndentDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public StockIndentDtlDTO getById(Long id) {
        StockIndentDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StockIndentDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<StockIndentDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StockIndentDtlDTO update(Long id, StockIndentDtlDTO dto) {
        StockIndentDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StockIndentDtl not found with ID: " + id));
        StockIndentDtl mapped = mapToEntity(dto);
        mapped.setIndentDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        StockIndentDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StockIndentDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private StockIndentDtl mapToEntity(StockIndentDtlDTO dto) {
        StockIndentDtl entity = new StockIndentDtl();
        entity.setIndentDtlId(dto.getIndentDtlId());
        entity.setIndentHdrId(dto.getIndentHdrId());
        entity.setIndentNo(dto.getIndentNo());
        entity.setSrId(dto.getSrId());
        entity.setSrNo(dto.getSrNo());
        entity.setSrActivityId(dto.getSrActivityId());
        entity.setItemId(dto.getItemId());
        entity.setItemName(dto.getItemName());
        entity.setDescription(dto.getDescription());
        entity.setMakerPartCode(dto.getMakerPartCode());
        entity.setAvailableQty(dto.getAvailableQty());
        entity.setIndentQty(dto.getIndentQty());
        entity.setIssueQty(dto.getIssueQty());
        entity.setStoreId(dto.getStoreId());
        entity.setStoreName(dto.getStoreName());
        entity.setUom(dto.getUom());
        entity.setErrorFlg(dto.getErrorFlg());
        entity.setErrorMessage(dto.getErrorMessage());
        entity.setUnitPrice(dto.getUnitPrice());
        entity.setProcessedFlg(dto.getProcessedFlg());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setItemTypeId(dto.getItemTypeId());
        entity.setItemTypeName(dto.getItemTypeName());
        return entity;
    }

    private StockIndentDtlDTO mapToDTO(StockIndentDtl entity) {
        StockIndentDtlDTO dto = new StockIndentDtlDTO();
        dto.setIndentDtlId(entity.getIndentDtlId());
        dto.setIndentHdrId(entity.getIndentHdrId());
        dto.setIndentNo(entity.getIndentNo());
        dto.setSrId(entity.getSrId());
        dto.setSrNo(entity.getSrNo());
        dto.setSrActivityId(entity.getSrActivityId());
        dto.setItemId(entity.getItemId());
        dto.setItemName(entity.getItemName());
        dto.setDescription(entity.getDescription());
        dto.setMakerPartCode(entity.getMakerPartCode());
        dto.setAvailableQty(entity.getAvailableQty());
        dto.setIndentQty(entity.getIndentQty());
        dto.setIssueQty(entity.getIssueQty());
        dto.setStoreId(entity.getStoreId());
        dto.setStoreName(entity.getStoreName());
        dto.setUom(entity.getUom());
        dto.setErrorFlg(entity.getErrorFlg());
        dto.setErrorMessage(entity.getErrorMessage());
        dto.setUnitPrice(entity.getUnitPrice());
        dto.setProcessedFlg(entity.getProcessedFlg());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setItemTypeId(entity.getItemTypeId());
        dto.setItemTypeName(entity.getItemTypeName());
        return dto;
    }
}