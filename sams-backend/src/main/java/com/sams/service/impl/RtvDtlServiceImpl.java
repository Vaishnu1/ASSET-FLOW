package com.sams.service.impl;

import com.sams.dto.RtvDtlDTO;
import com.sams.entity.RtvDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.RtvDtlRepository;
import com.sams.service.RtvDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RtvDtlServiceImpl implements RtvDtlService {

    private final RtvDtlRepository repository;

    @Override
    @Transactional
    public RtvDtlDTO create(RtvDtlDTO dto) {
        RtvDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public RtvDtlDTO getById(Long id) {
        RtvDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RtvDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<RtvDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RtvDtlDTO update(Long id, RtvDtlDTO dto) {
        RtvDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RtvDtl not found with ID: " + id));
        RtvDtl mapped = mapToEntity(dto);
        mapped.setRtvDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        RtvDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RtvDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private RtvDtl mapToEntity(RtvDtlDTO dto) {
        RtvDtl entity = new RtvDtl();
        entity.setRtvDtlId(dto.getRtvDtlId());
        entity.setRtvHdrId(dto.getRtvHdrId());
        entity.setPoNo(dto.getPoNo());
        entity.setGrnDtlId(dto.getGrnDtlId());
        entity.setPoLineId(dto.getPoLineId());
        entity.setItemId(dto.getItemId());
        entity.setItemName(dto.getItemName());
        entity.setItemDescription(dto.getItemDescription());
        entity.setStoreId(dto.getStoreId());
        entity.setPoQty(dto.getPoQty());
        entity.setGrnQty(dto.getGrnQty());
        entity.setRtvQty(dto.getRtvQty());
        entity.setStockQty(dto.getStockQty());
        entity.setUomCd(dto.getUomCd());
        entity.setManufacturerPartNo(dto.getManufacturerPartNo());
        entity.setRtvReason(dto.getRtvReason());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setItemTypeId(dto.getItemTypeId());
        entity.setItemTypeName(dto.getItemTypeName());
        return entity;
    }

    private RtvDtlDTO mapToDTO(RtvDtl entity) {
        RtvDtlDTO dto = new RtvDtlDTO();
        dto.setRtvDtlId(entity.getRtvDtlId());
        dto.setRtvHdrId(entity.getRtvHdrId());
        dto.setPoNo(entity.getPoNo());
        dto.setGrnDtlId(entity.getGrnDtlId());
        dto.setPoLineId(entity.getPoLineId());
        dto.setItemId(entity.getItemId());
        dto.setItemName(entity.getItemName());
        dto.setItemDescription(entity.getItemDescription());
        dto.setStoreId(entity.getStoreId());
        dto.setPoQty(entity.getPoQty());
        dto.setGrnQty(entity.getGrnQty());
        dto.setRtvQty(entity.getRtvQty());
        dto.setStockQty(entity.getStockQty());
        dto.setUomCd(entity.getUomCd());
        dto.setManufacturerPartNo(entity.getManufacturerPartNo());
        dto.setRtvReason(entity.getRtvReason());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setItemTypeId(entity.getItemTypeId());
        dto.setItemTypeName(entity.getItemTypeName());
        return dto;
    }
}