package com.sams.service.impl;

import com.sams.dto.SupplierInvoiceHdrDTO;
import com.sams.entity.SupplierInvoiceHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SupplierInvoiceHdrRepository;
import com.sams.service.SupplierInvoiceHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierInvoiceHdrServiceImpl implements SupplierInvoiceHdrService {

    private final SupplierInvoiceHdrRepository repository;

    @Override
    @Transactional
    public SupplierInvoiceHdrDTO create(SupplierInvoiceHdrDTO dto) {
        SupplierInvoiceHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SupplierInvoiceHdrDTO getById(Long id) {
        SupplierInvoiceHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierInvoiceHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SupplierInvoiceHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SupplierInvoiceHdrDTO update(Long id, SupplierInvoiceHdrDTO dto) {
        SupplierInvoiceHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierInvoiceHdr not found with ID: " + id));
        SupplierInvoiceHdr mapped = mapToEntity(dto);
        mapped.setSupplierInvoiceHdrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SupplierInvoiceHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierInvoiceHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private SupplierInvoiceHdr mapToEntity(SupplierInvoiceHdrDTO dto) {
        SupplierInvoiceHdr entity = new SupplierInvoiceHdr();
        entity.setSupplierInvoiceHdrId(dto.getSupplierInvoiceHdrId());
        entity.setSupplierInvoiceNo(dto.getSupplierInvoiceNo());
        entity.setOrgId(dto.getOrgId());
        entity.setInvoiceRegDt(dto.getInvoiceRegDt());
        entity.setInvoiceDt(dto.getInvoiceDt());
        entity.setInvoiceStatus(dto.getInvoiceStatus());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setSupplierId(dto.getSupplierId());
        entity.setSupplierCd(dto.getSupplierCd());
        entity.setSupplierName(dto.getSupplierName());
        entity.setSupplierSiteId(dto.getSupplierSiteId());
        entity.setSupplierSiteName(dto.getSupplierSiteName());
        entity.setCurCd(dto.getCurCd());
        entity.setExchRate(dto.getExchRate());
        entity.setBasicInvoiceAmt(dto.getBasicInvoiceAmt());
        entity.setTaxTotal(dto.getTaxTotal());
        entity.setTransCharges(dto.getTransCharges());
        entity.setMiscCharges(dto.getMiscCharges());
        entity.setTotalInvoiceAmt(dto.getTotalInvoiceAmt());
        entity.setLocalCurCd(dto.getLocalCurCd());
        entity.setLocalTotalAmt(dto.getLocalTotalAmt());
        entity.setMatchAction(dto.getMatchAction());
        entity.setPaymentDueDate(dto.getPaymentDueDate());
        entity.setAdvancePayments(dto.getAdvancePayments());
        entity.setRemarks(dto.getRemarks());
        entity.setRemarks1(dto.getRemarks1());
        entity.setApprovedBy(dto.getApprovedBy());
        entity.setApprovedDt(dto.getApprovedDt());
        entity.setValidatedBy(dto.getValidatedBy());
        entity.setValidatedDt(dto.getValidatedDt());
        entity.setRejectedBy(dto.getRejectedBy());
        entity.setRejectedDt(dto.getRejectedDt());
        entity.setCancelledBy(dto.getCancelledBy());
        entity.setCancelledDt(dto.getCancelledDt());
        entity.setErpInterfacedFlag(dto.getErpInterfacedFlag());
        entity.setErpInterfacedRemarks(dto.getErpInterfacedRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setGrnType(dto.getGrnType());
        return entity;
    }

    private SupplierInvoiceHdrDTO mapToDTO(SupplierInvoiceHdr entity) {
        SupplierInvoiceHdrDTO dto = new SupplierInvoiceHdrDTO();
        dto.setSupplierInvoiceHdrId(entity.getSupplierInvoiceHdrId());
        dto.setSupplierInvoiceNo(entity.getSupplierInvoiceNo());
        dto.setOrgId(entity.getOrgId());
        dto.setInvoiceRegDt(entity.getInvoiceRegDt());
        dto.setInvoiceDt(entity.getInvoiceDt());
        dto.setInvoiceStatus(entity.getInvoiceStatus());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setSupplierId(entity.getSupplierId());
        dto.setSupplierCd(entity.getSupplierCd());
        dto.setSupplierName(entity.getSupplierName());
        dto.setSupplierSiteId(entity.getSupplierSiteId());
        dto.setSupplierSiteName(entity.getSupplierSiteName());
        dto.setCurCd(entity.getCurCd());
        dto.setExchRate(entity.getExchRate());
        dto.setBasicInvoiceAmt(entity.getBasicInvoiceAmt());
        dto.setTaxTotal(entity.getTaxTotal());
        dto.setTransCharges(entity.getTransCharges());
        dto.setMiscCharges(entity.getMiscCharges());
        dto.setTotalInvoiceAmt(entity.getTotalInvoiceAmt());
        dto.setLocalCurCd(entity.getLocalCurCd());
        dto.setLocalTotalAmt(entity.getLocalTotalAmt());
        dto.setMatchAction(entity.getMatchAction());
        dto.setPaymentDueDate(entity.getPaymentDueDate());
        dto.setAdvancePayments(entity.getAdvancePayments());
        dto.setRemarks(entity.getRemarks());
        dto.setRemarks1(entity.getRemarks1());
        dto.setApprovedBy(entity.getApprovedBy());
        dto.setApprovedDt(entity.getApprovedDt());
        dto.setValidatedBy(entity.getValidatedBy());
        dto.setValidatedDt(entity.getValidatedDt());
        dto.setRejectedBy(entity.getRejectedBy());
        dto.setRejectedDt(entity.getRejectedDt());
        dto.setCancelledBy(entity.getCancelledBy());
        dto.setCancelledDt(entity.getCancelledDt());
        dto.setErpInterfacedFlag(entity.getErpInterfacedFlag());
        dto.setErpInterfacedRemarks(entity.getErpInterfacedRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setGrnType(entity.getGrnType());
        return dto;
    }
}