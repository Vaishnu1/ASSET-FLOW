package com.sams.service.impl;

import com.sams.dto.PoPriceDtlDTO;
import com.sams.entity.PoPriceDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PoPriceDtlRepository;
import com.sams.service.PoPriceDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PoPriceDtlServiceImpl implements PoPriceDtlService {

    private final PoPriceDtlRepository repository;

    @Override
    @Transactional
    public PoPriceDtlDTO create(PoPriceDtlDTO dto) {
        PoPriceDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PoPriceDtlDTO getById(Long id) {
        PoPriceDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoPriceDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PoPriceDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PoPriceDtlDTO update(Long id, PoPriceDtlDTO dto) {
        PoPriceDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoPriceDtl not found with ID: " + id));
        PoPriceDtl mapped = mapToEntity(dto);
        mapped.setPoPriceDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PoPriceDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoPriceDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private PoPriceDtl mapToEntity(PoPriceDtlDTO dto) {
        PoPriceDtl entity = new PoPriceDtl();
        entity.setPoPriceDtlId(dto.getPoPriceDtlId());
        entity.setPoPriceHdrId(dto.getPoPriceHdrId());
        entity.setItemName(dto.getItemName());
        entity.setItemId(dto.getItemId());
        entity.setUnitPrice(dto.getUnitPrice());
        entity.setUomCode(dto.getUomCode());
        entity.setSupplierId(dto.getSupplierId());
        entity.setSupplierName(dto.getSupplierName());
        entity.setCurrency(dto.getCurrency());
        entity.setStartDate(dto.getStartDate());
        entity.setEndDate(dto.getEndDate());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private PoPriceDtlDTO mapToDTO(PoPriceDtl entity) {
        PoPriceDtlDTO dto = new PoPriceDtlDTO();
        dto.setPoPriceDtlId(entity.getPoPriceDtlId());
        dto.setPoPriceHdrId(entity.getPoPriceHdrId());
        dto.setItemName(entity.getItemName());
        dto.setItemId(entity.getItemId());
        dto.setUnitPrice(entity.getUnitPrice());
        dto.setUomCode(entity.getUomCode());
        dto.setSupplierId(entity.getSupplierId());
        dto.setSupplierName(entity.getSupplierName());
        dto.setCurrency(entity.getCurrency());
        dto.setStartDate(entity.getStartDate());
        dto.setEndDate(entity.getEndDate());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}