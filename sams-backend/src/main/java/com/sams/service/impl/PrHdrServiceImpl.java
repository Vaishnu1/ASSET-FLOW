package com.sams.service.impl;

import com.sams.dto.PrHdrDTO;
import com.sams.entity.PrHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PrHdrRepository;
import com.sams.service.PrHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrHdrServiceImpl implements PrHdrService {

    private final PrHdrRepository repository;

    @Override
    @Transactional
    public PrHdrDTO create(PrHdrDTO dto) {
        PrHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PrHdrDTO getById(Long id) {
        PrHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PrHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PrHdrDTO update(Long id, PrHdrDTO dto) {
        PrHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrHdr not found with ID: " + id));
        PrHdr mapped = mapToEntity(dto);
        mapped.setPrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PrHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private PrHdr mapToEntity(PrHdrDTO dto) {
        PrHdr entity = new PrHdr();
        entity.setPrId(dto.getPrId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setPrNo(dto.getPrNo());
        entity.setPrDt(dto.getPrDt());
        entity.setPrStatus(dto.getPrStatus());
        entity.setTotalBasicAmt(dto.getTotalBasicAmt());
        entity.setTotalTaxAmt(dto.getTotalTaxAmt());
        entity.setGrandAmt(dto.getGrandAmt());
        entity.setRemarks(dto.getRemarks());
        entity.setAssetHdrId(dto.getAssetHdrId());
        entity.setAssetCode(dto.getAssetCode());
        entity.setSrId(dto.getSrId());
        entity.setSrNo(dto.getSrNo());
        entity.setPrType(dto.getPrType());
        entity.setPrReason(dto.getPrReason());
        entity.setPrUsage(dto.getPrUsage());
        entity.setCancelReason(dto.getCancelReason());
        entity.setRejectReason(dto.getRejectReason());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setLocalGrandAmt(dto.getLocalGrandAmt());
        entity.setWorkFlowProcessStatusId(dto.getWorkFlowProcessStatusId());
        return entity;
    }

    private PrHdrDTO mapToDTO(PrHdr entity) {
        PrHdrDTO dto = new PrHdrDTO();
        dto.setPrId(entity.getPrId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setPrNo(entity.getPrNo());
        dto.setPrDt(entity.getPrDt());
        dto.setPrStatus(entity.getPrStatus());
        dto.setTotalBasicAmt(entity.getTotalBasicAmt());
        dto.setTotalTaxAmt(entity.getTotalTaxAmt());
        dto.setGrandAmt(entity.getGrandAmt());
        dto.setRemarks(entity.getRemarks());
        dto.setAssetHdrId(entity.getAssetHdrId());
        dto.setAssetCode(entity.getAssetCode());
        dto.setSrId(entity.getSrId());
        dto.setSrNo(entity.getSrNo());
        dto.setPrType(entity.getPrType());
        dto.setPrReason(entity.getPrReason());
        dto.setPrUsage(entity.getPrUsage());
        dto.setCancelReason(entity.getCancelReason());
        dto.setRejectReason(entity.getRejectReason());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setLocalGrandAmt(entity.getLocalGrandAmt());
        dto.setWorkFlowProcessStatusId(entity.getWorkFlowProcessStatusId());
        return dto;
    }
}