package com.sams.service.impl;

import com.sams.dto.SrActServiceCostDTO;
import com.sams.entity.SrActServiceCost;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrActServiceCostRepository;
import com.sams.service.SrActServiceCostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrActServiceCostServiceImpl implements SrActServiceCostService {

    private final SrActServiceCostRepository repository;

    @Override
    @Transactional
    public SrActServiceCostDTO create(SrActServiceCostDTO dto) {
        SrActServiceCost entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrActServiceCostDTO getById(Long id) {
        SrActServiceCost entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrActServiceCost not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrActServiceCostDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrActServiceCostDTO update(Long id, SrActServiceCostDTO dto) {
        SrActServiceCost entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrActServiceCost not found with ID: " + id));
        SrActServiceCost mapped = mapToEntity(dto);
        mapped.setSrActServiceCostId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrActServiceCost entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrActServiceCost not found with ID: " + id));
        repository.delete(entity);
    }

    private SrActServiceCost mapToEntity(SrActServiceCostDTO dto) {
        SrActServiceCost entity = new SrActServiceCost();
        entity.setSrActServiceCostId(dto.getSrActServiceCostId());
        entity.setSrId(dto.getSrId());
        entity.setOrgId(dto.getOrgId());
        entity.setSrActivityId(dto.getSrActivityId());
        entity.setServiceType(dto.getServiceType());
        entity.setServiceSpareDesc(dto.getServiceSpareDesc());
        entity.setUom(dto.getUom());
        entity.setUnitPrice(dto.getUnitPrice());
        entity.setQty(dto.getQty());
        entity.setTotalCost(dto.getTotalCost());
        entity.setItemId(dto.getItemId());
        entity.setItemName(dto.getItemName());
        entity.setItemSerialNo(dto.getItemSerialNo());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SrActServiceCostDTO mapToDTO(SrActServiceCost entity) {
        SrActServiceCostDTO dto = new SrActServiceCostDTO();
        dto.setSrActServiceCostId(entity.getSrActServiceCostId());
        dto.setSrId(entity.getSrId());
        dto.setOrgId(entity.getOrgId());
        dto.setSrActivityId(entity.getSrActivityId());
        dto.setServiceType(entity.getServiceType());
        dto.setServiceSpareDesc(entity.getServiceSpareDesc());
        dto.setUom(entity.getUom());
        dto.setUnitPrice(entity.getUnitPrice());
        dto.setQty(entity.getQty());
        dto.setTotalCost(entity.getTotalCost());
        dto.setItemId(entity.getItemId());
        dto.setItemName(entity.getItemName());
        dto.setItemSerialNo(entity.getItemSerialNo());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}