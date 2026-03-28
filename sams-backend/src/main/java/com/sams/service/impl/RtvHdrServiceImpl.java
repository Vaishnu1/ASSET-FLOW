package com.sams.service.impl;

import com.sams.dto.RtvHdrDTO;
import com.sams.entity.RtvHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.RtvHdrRepository;
import com.sams.service.RtvHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RtvHdrServiceImpl implements RtvHdrService {

    private final RtvHdrRepository repository;

    @Override
    @Transactional
    public RtvHdrDTO create(RtvHdrDTO dto) {
        RtvHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public RtvHdrDTO getById(Long id) {
        RtvHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RtvHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<RtvHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RtvHdrDTO update(Long id, RtvHdrDTO dto) {
        RtvHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RtvHdr not found with ID: " + id));
        RtvHdr mapped = mapToEntity(dto);
        mapped.setRtvHdrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        RtvHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RtvHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private RtvHdr mapToEntity(RtvHdrDTO dto) {
        RtvHdr entity = new RtvHdr();
        entity.setRtvHdrId(dto.getRtvHdrId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setRtvNo(dto.getRtvNo());
        entity.setRtvDate(dto.getRtvDate());
        entity.setGrnId(dto.getGrnId());
        entity.setGrnNo(dto.getGrnNo());
        entity.setDoNo(dto.getDoNo());
        entity.setRtvRequestedBy(dto.getRtvRequestedBy());
        entity.setRtvStatus(dto.getRtvStatus());
        entity.setSupplierId(dto.getSupplierId());
        entity.setSupplierSiteId(dto.getSupplierSiteId());
        entity.setRtvRemarks(dto.getRtvRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setCancelReason(dto.getCancelReason());
        entity.setRejectReason(dto.getRejectReason());
        return entity;
    }

    private RtvHdrDTO mapToDTO(RtvHdr entity) {
        RtvHdrDTO dto = new RtvHdrDTO();
        dto.setRtvHdrId(entity.getRtvHdrId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setRtvNo(entity.getRtvNo());
        dto.setRtvDate(entity.getRtvDate());
        dto.setGrnId(entity.getGrnId());
        dto.setGrnNo(entity.getGrnNo());
        dto.setDoNo(entity.getDoNo());
        dto.setRtvRequestedBy(entity.getRtvRequestedBy());
        dto.setRtvStatus(entity.getRtvStatus());
        dto.setSupplierId(entity.getSupplierId());
        dto.setSupplierSiteId(entity.getSupplierSiteId());
        dto.setRtvRemarks(entity.getRtvRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setCancelReason(entity.getCancelReason());
        dto.setRejectReason(entity.getRejectReason());
        return dto;
    }
}