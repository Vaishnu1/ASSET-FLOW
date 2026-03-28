package com.sams.service.impl;

import com.sams.dto.StockAdjsDtlDTO;
import com.sams.entity.StockAdjsDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.StockAdjsDtlRepository;
import com.sams.service.StockAdjsDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StockAdjsDtlServiceImpl implements StockAdjsDtlService {

    private final StockAdjsDtlRepository repository;

    @Override
    @Transactional
    public StockAdjsDtlDTO create(StockAdjsDtlDTO dto) {
        StockAdjsDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public StockAdjsDtlDTO getById(Long id) {
        StockAdjsDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StockAdjsDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<StockAdjsDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StockAdjsDtlDTO update(Long id, StockAdjsDtlDTO dto) {
        StockAdjsDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StockAdjsDtl not found with ID: " + id));
        StockAdjsDtl mapped = mapToEntity(dto);
        mapped.setStockAdjsDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        StockAdjsDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StockAdjsDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private StockAdjsDtl mapToEntity(StockAdjsDtlDTO dto) {
        StockAdjsDtl entity = new StockAdjsDtl();
        entity.setStockAdjsDtlId(dto.getStockAdjsDtlId());
        entity.setStockAdjsHdrId(dto.getStockAdjsHdrId());
        entity.setItemId(dto.getItemId());
        entity.setItemCd(dto.getItemCd());
        entity.setAvailableQty(dto.getAvailableQty());
        entity.setRcvQty(dto.getRcvQty());
        entity.setAdjQty(dto.getAdjQty());
        entity.setWoNo(dto.getWoNo());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setWhid(dto.getWhid());
        entity.setWhcd(dto.getWhcd());
        return entity;
    }

    private StockAdjsDtlDTO mapToDTO(StockAdjsDtl entity) {
        StockAdjsDtlDTO dto = new StockAdjsDtlDTO();
        dto.setStockAdjsDtlId(entity.getStockAdjsDtlId());
        dto.setStockAdjsHdrId(entity.getStockAdjsHdrId());
        dto.setItemId(entity.getItemId());
        dto.setItemCd(entity.getItemCd());
        dto.setAvailableQty(entity.getAvailableQty());
        dto.setRcvQty(entity.getRcvQty());
        dto.setAdjQty(entity.getAdjQty());
        dto.setWoNo(entity.getWoNo());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setWhid(entity.getWhid());
        dto.setWhcd(entity.getWhcd());
        return dto;
    }
}