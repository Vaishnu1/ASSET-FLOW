package com.sams.service.impl;

import com.sams.dto.SuppInvoiceDtlDTO;
import com.sams.entity.SuppInvoiceDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SuppInvoiceDtlRepository;
import com.sams.service.SuppInvoiceDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SuppInvoiceDtlServiceImpl implements SuppInvoiceDtlService {

    private final SuppInvoiceDtlRepository repository;

    @Override
    @Transactional
    public SuppInvoiceDtlDTO create(SuppInvoiceDtlDTO dto) {
        SuppInvoiceDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SuppInvoiceDtlDTO getById(Long id) {
        SuppInvoiceDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SuppInvoiceDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SuppInvoiceDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SuppInvoiceDtlDTO update(Long id, SuppInvoiceDtlDTO dto) {
        SuppInvoiceDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SuppInvoiceDtl not found with ID: " + id));
        SuppInvoiceDtl mapped = mapToEntity(dto);
        mapped.setSuppInvoiceDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SuppInvoiceDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SuppInvoiceDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private SuppInvoiceDtl mapToEntity(SuppInvoiceDtlDTO dto) {
        SuppInvoiceDtl entity = new SuppInvoiceDtl();
        entity.setSuppInvoiceDtlId(dto.getSuppInvoiceDtlId());
        entity.setSuppInvoiceId(dto.getSuppInvoiceId());
        entity.setPoDtlId(dto.getPoDtlId());
        entity.setPoNo(dto.getPoNo());
        entity.setPoLineNo(dto.getPoLineNo());
        entity.setReceiptsNo(dto.getReceiptsNo());
        entity.setRcvDtlId(dto.getRcvDtlId());
        entity.setItemId(dto.getItemId());
        entity.setItemCd(dto.getItemCd());
        entity.setItemDesc(dto.getItemDesc());
        entity.setSuppItemCd(dto.getSuppItemCd());
        entity.setUomCd(dto.getUomCd());
        entity.setInvQty(dto.getInvQty());
        entity.setUnitPrice(dto.getUnitPrice());
        entity.setLocUnitPrice(dto.getLocUnitPrice());
        entity.setInvAmt(dto.getInvAmt());
        entity.setLocalInvAmt(dto.getLocalInvAmt());
        entity.setShipReqDt(dto.getShipReqDt());
        entity.setShipScheduleDt(dto.getShipScheduleDt());
        entity.setLastShipDt(dto.getLastShipDt());
        entity.setRemarks(dto.getRemarks());
        entity.setSerialNo(dto.getSerialNo());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SuppInvoiceDtlDTO mapToDTO(SuppInvoiceDtl entity) {
        SuppInvoiceDtlDTO dto = new SuppInvoiceDtlDTO();
        dto.setSuppInvoiceDtlId(entity.getSuppInvoiceDtlId());
        dto.setSuppInvoiceId(entity.getSuppInvoiceId());
        dto.setPoDtlId(entity.getPoDtlId());
        dto.setPoNo(entity.getPoNo());
        dto.setPoLineNo(entity.getPoLineNo());
        dto.setReceiptsNo(entity.getReceiptsNo());
        dto.setRcvDtlId(entity.getRcvDtlId());
        dto.setItemId(entity.getItemId());
        dto.setItemCd(entity.getItemCd());
        dto.setItemDesc(entity.getItemDesc());
        dto.setSuppItemCd(entity.getSuppItemCd());
        dto.setUomCd(entity.getUomCd());
        dto.setInvQty(entity.getInvQty());
        dto.setUnitPrice(entity.getUnitPrice());
        dto.setLocUnitPrice(entity.getLocUnitPrice());
        dto.setInvAmt(entity.getInvAmt());
        dto.setLocalInvAmt(entity.getLocalInvAmt());
        dto.setShipReqDt(entity.getShipReqDt());
        dto.setShipScheduleDt(entity.getShipScheduleDt());
        dto.setLastShipDt(entity.getLastShipDt());
        dto.setRemarks(entity.getRemarks());
        dto.setSerialNo(entity.getSerialNo());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}