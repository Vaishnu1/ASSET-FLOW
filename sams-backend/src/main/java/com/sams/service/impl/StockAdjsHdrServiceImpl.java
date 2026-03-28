package com.sams.service.impl;

import com.sams.dto.StockAdjsHdrDTO;
import com.sams.entity.StockAdjsHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.StockAdjsHdrRepository;
import com.sams.service.StockAdjsHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StockAdjsHdrServiceImpl implements StockAdjsHdrService {

    private final StockAdjsHdrRepository repository;

    @Override
    @Transactional
    public StockAdjsHdrDTO create(StockAdjsHdrDTO dto) {
        StockAdjsHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public StockAdjsHdrDTO getById(Long id) {
        StockAdjsHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StockAdjsHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<StockAdjsHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StockAdjsHdrDTO update(Long id, StockAdjsHdrDTO dto) {
        StockAdjsHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StockAdjsHdr not found with ID: " + id));
        StockAdjsHdr mapped = mapToEntity(dto);
        mapped.setStockAdjsHdrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        StockAdjsHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StockAdjsHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private StockAdjsHdr mapToEntity(StockAdjsHdrDTO dto) {
        StockAdjsHdr entity = new StockAdjsHdr();
        entity.setStockAdjsHdrId(dto.getStockAdjsHdrId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocId(dto.getLocId());
        entity.setStockAdjsNo(dto.getStockAdjsNo());
        entity.setTransDt(dto.getTransDt());
        entity.setTransType(dto.getTransType());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private StockAdjsHdrDTO mapToDTO(StockAdjsHdr entity) {
        StockAdjsHdrDTO dto = new StockAdjsHdrDTO();
        dto.setStockAdjsHdrId(entity.getStockAdjsHdrId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocId(entity.getLocId());
        dto.setStockAdjsNo(entity.getStockAdjsNo());
        dto.setTransDt(entity.getTransDt());
        dto.setTransType(entity.getTransType());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}