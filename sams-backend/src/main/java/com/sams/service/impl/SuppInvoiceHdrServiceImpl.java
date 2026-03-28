package com.sams.service.impl;

import com.sams.dto.SuppInvoiceHdrDTO;
import com.sams.entity.SuppInvoiceHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SuppInvoiceHdrRepository;
import com.sams.service.SuppInvoiceHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SuppInvoiceHdrServiceImpl implements SuppInvoiceHdrService {

    private final SuppInvoiceHdrRepository repository;

    @Override
    @Transactional
    public SuppInvoiceHdrDTO create(SuppInvoiceHdrDTO dto) {
        SuppInvoiceHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SuppInvoiceHdrDTO getById(Long id) {
        SuppInvoiceHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SuppInvoiceHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SuppInvoiceHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SuppInvoiceHdrDTO update(Long id, SuppInvoiceHdrDTO dto) {
        SuppInvoiceHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SuppInvoiceHdr not found with ID: " + id));
        SuppInvoiceHdr mapped = mapToEntity(dto);
        mapped.setSuppInvoiceId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SuppInvoiceHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SuppInvoiceHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private SuppInvoiceHdr mapToEntity(SuppInvoiceHdrDTO dto) {
        SuppInvoiceHdr entity = new SuppInvoiceHdr();
        entity.setSuppInvoiceId(dto.getSuppInvoiceId());
        entity.setSuppInvoiceNo(dto.getSuppInvoiceNo());
        entity.setInvoiceMode(dto.getInvoiceMode());
        entity.setInvoiceRegDt(dto.getInvoiceRegDt());
        entity.setInvoiceDt(dto.getInvoiceDt());
        entity.setInvoiceStatus(dto.getInvoiceStatus());
        entity.setInvoiceClass(dto.getInvoiceClass());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setSuppId(dto.getSuppId());
        entity.setSuppCd(dto.getSuppCd());
        entity.setSuppName(dto.getSuppName());
        entity.setCurCd(dto.getCurCd());
        entity.setExchRate(dto.getExchRate());
        entity.setBasicInvoiceAmt(dto.getBasicInvoiceAmt());
        entity.setTaxTotal(dto.getTaxTotal());
        entity.setTransCharges(dto.getTransCharges());
        entity.setMiscCharges(dto.getMiscCharges());
        entity.setTotalInvoiceAmt(dto.getTotalInvoiceAmt());
        entity.setLocalCurCd(dto.getLocalCurCd());
        entity.setLocalTotalAmt(dto.getLocalTotalAmt());
        entity.setRemarks(dto.getRemarks());
        entity.setRemarks1(dto.getRemarks1());
        entity.setAddValidate(dto.getAddValidate());
        entity.setPayment(dto.getPayment());
        entity.setApprovedBy(dto.getApprovedBy());
        entity.setApprovedDt(dto.getApprovedDt());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SuppInvoiceHdrDTO mapToDTO(SuppInvoiceHdr entity) {
        SuppInvoiceHdrDTO dto = new SuppInvoiceHdrDTO();
        dto.setSuppInvoiceId(entity.getSuppInvoiceId());
        dto.setSuppInvoiceNo(entity.getSuppInvoiceNo());
        dto.setInvoiceMode(entity.getInvoiceMode());
        dto.setInvoiceRegDt(entity.getInvoiceRegDt());
        dto.setInvoiceDt(entity.getInvoiceDt());
        dto.setInvoiceStatus(entity.getInvoiceStatus());
        dto.setInvoiceClass(entity.getInvoiceClass());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setSuppId(entity.getSuppId());
        dto.setSuppCd(entity.getSuppCd());
        dto.setSuppName(entity.getSuppName());
        dto.setCurCd(entity.getCurCd());
        dto.setExchRate(entity.getExchRate());
        dto.setBasicInvoiceAmt(entity.getBasicInvoiceAmt());
        dto.setTaxTotal(entity.getTaxTotal());
        dto.setTransCharges(entity.getTransCharges());
        dto.setMiscCharges(entity.getMiscCharges());
        dto.setTotalInvoiceAmt(entity.getTotalInvoiceAmt());
        dto.setLocalCurCd(entity.getLocalCurCd());
        dto.setLocalTotalAmt(entity.getLocalTotalAmt());
        dto.setRemarks(entity.getRemarks());
        dto.setRemarks1(entity.getRemarks1());
        dto.setAddValidate(entity.getAddValidate());
        dto.setPayment(entity.getPayment());
        dto.setApprovedBy(entity.getApprovedBy());
        dto.setApprovedDt(entity.getApprovedDt());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}