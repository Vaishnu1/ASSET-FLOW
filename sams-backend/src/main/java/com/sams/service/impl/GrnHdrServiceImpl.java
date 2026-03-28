package com.sams.service.impl;

import com.sams.dto.GrnHdrDTO;
import com.sams.entity.GrnHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.GrnHdrRepository;
import com.sams.service.GrnHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GrnHdrServiceImpl implements GrnHdrService {

    private final GrnHdrRepository repository;

    @Override
    @Transactional
    public GrnHdrDTO create(GrnHdrDTO dto) {
        GrnHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public GrnHdrDTO getById(Long id) {
        GrnHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GrnHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<GrnHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public GrnHdrDTO update(Long id, GrnHdrDTO dto) {
        GrnHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GrnHdr not found with ID: " + id));
        GrnHdr mapped = mapToEntity(dto);
        mapped.setGrnId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        GrnHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GrnHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private GrnHdr mapToEntity(GrnHdrDTO dto) {
        GrnHdr entity = new GrnHdr();
        entity.setGrnId(dto.getGrnId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setGrnNo(dto.getGrnNo());
        entity.setGrnDt(dto.getGrnDt());
        entity.setSupplierId(dto.getSupplierId());
        entity.setSupplierName(dto.getSupplierName());
        entity.setSupplierSiteId(dto.getSupplierSiteId());
        entity.setSupplierSiteName(dto.getSupplierSiteName());
        entity.setDoNo(dto.getDoNo());
        entity.setGrnStatus(dto.getGrnStatus());
        entity.setSupplierInvoiceNo(dto.getSupplierInvoiceNo());
        entity.setSupplierInvoiceDt(dto.getSupplierInvoiceDt());
        entity.setSupplierCd(dto.getSupplierCd());
        entity.setSupplierCurrencyCd(dto.getSupplierCurrencyCd());
        entity.setRemarks(dto.getRemarks());
        entity.setOrderType(dto.getOrderType());
        entity.setDoDt(dto.getDoDt());
        entity.setErrorFlg(dto.getErrorFlg());
        entity.setErrorMessage(dto.getErrorMessage());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setGrnFor(dto.getGrnFor());
        entity.setCancelReason(dto.getCancelReason());
        entity.setRejectReason(dto.getRejectReason());
        entity.setSupplierInvoiceAmount(dto.getSupplierInvoiceAmount());
        return entity;
    }

    private GrnHdrDTO mapToDTO(GrnHdr entity) {
        GrnHdrDTO dto = new GrnHdrDTO();
        dto.setGrnId(entity.getGrnId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setGrnNo(entity.getGrnNo());
        dto.setGrnDt(entity.getGrnDt());
        dto.setSupplierId(entity.getSupplierId());
        dto.setSupplierName(entity.getSupplierName());
        dto.setSupplierSiteId(entity.getSupplierSiteId());
        dto.setSupplierSiteName(entity.getSupplierSiteName());
        dto.setDoNo(entity.getDoNo());
        dto.setGrnStatus(entity.getGrnStatus());
        dto.setSupplierInvoiceNo(entity.getSupplierInvoiceNo());
        dto.setSupplierInvoiceDt(entity.getSupplierInvoiceDt());
        dto.setSupplierCd(entity.getSupplierCd());
        dto.setSupplierCurrencyCd(entity.getSupplierCurrencyCd());
        dto.setRemarks(entity.getRemarks());
        dto.setOrderType(entity.getOrderType());
        dto.setDoDt(entity.getDoDt());
        dto.setErrorFlg(entity.getErrorFlg());
        dto.setErrorMessage(entity.getErrorMessage());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setGrnFor(entity.getGrnFor());
        dto.setCancelReason(entity.getCancelReason());
        dto.setRejectReason(entity.getRejectReason());
        dto.setSupplierInvoiceAmount(entity.getSupplierInvoiceAmount());
        return dto;
    }
}