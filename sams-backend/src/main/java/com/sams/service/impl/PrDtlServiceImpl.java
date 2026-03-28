package com.sams.service.impl;

import com.sams.dto.PrDtlDTO;
import com.sams.entity.PrDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PrDtlRepository;
import com.sams.service.PrDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrDtlServiceImpl implements PrDtlService {

    private final PrDtlRepository repository;

    @Override
    @Transactional
    public PrDtlDTO create(PrDtlDTO dto) {
        PrDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PrDtlDTO getById(Long id) {
        PrDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PrDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PrDtlDTO update(Long id, PrDtlDTO dto) {
        PrDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrDtl not found with ID: " + id));
        PrDtl mapped = mapToEntity(dto);
        mapped.setPrDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PrDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private PrDtl mapToEntity(PrDtlDTO dto) {
        PrDtl entity = new PrDtl();
        entity.setPrDtlId(dto.getPrDtlId());
        entity.setPrId(dto.getPrId());
        entity.setPrNo(dto.getPrNo());
        entity.setPrLineNo(dto.getPrLineNo());
        entity.setSupplierId(dto.getSupplierId());
        entity.setSupplierName(dto.getSupplierName());
        entity.setSupplierSiteId(dto.getSupplierSiteId());
        entity.setSupplierSiteName(dto.getSupplierSiteName());
        entity.setSupplierItemCd(dto.getSupplierItemCd());
        entity.setCurCd(dto.getCurCd());
        entity.setNewItemFlag(dto.getNewItemFlag());
        entity.setItemId(dto.getItemId());
        entity.setItemName(dto.getItemName());
        entity.setItemDescription(dto.getItemDescription());
        entity.setManufacturerPartNo(dto.getManufacturerPartNo());
        entity.setUomCode(dto.getUomCode());
        entity.setItemCategoryId(dto.getItemCategoryId());
        entity.setItemCategoryName(dto.getItemCategoryName());
        entity.setItemTypeId(dto.getItemTypeId());
        entity.setItemTypeName(dto.getItemTypeName());
        entity.setPrRequiredQty(dto.getPrRequiredQty());
        entity.setPrCancelQty(dto.getPrCancelQty());
        entity.setUnitPrice(dto.getUnitPrice());
        entity.setNeedByDt(dto.getNeedByDt());
        entity.setBasicAmt(dto.getBasicAmt());
        entity.setTaxCd1(dto.getTaxCd1());
        entity.setTaxRate1(dto.getTaxRate1());
        entity.setTaxAmt1(dto.getTaxAmt1());
        entity.setTaxCd2(dto.getTaxCd2());
        entity.setTaxRate2(dto.getTaxRate2());
        entity.setTaxAmt2(dto.getTaxAmt2());
        entity.setTaxCd3(dto.getTaxCd3());
        entity.setTaxRate3(dto.getTaxRate3());
        entity.setTaxAmt3(dto.getTaxAmt3());
        entity.setItemTotalTaxAmt(dto.getItemTotalTaxAmt());
        entity.setTotalAmt(dto.getTotalAmt());
        entity.setRemarks(dto.getRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setPoHdrId(dto.getPoHdrId());
        entity.setPoNo(dto.getPoNo());
        entity.setExchRate(dto.getExchRate());
        entity.setLocalTotalAmt(dto.getLocalTotalAmt());
        return entity;
    }

    private PrDtlDTO mapToDTO(PrDtl entity) {
        PrDtlDTO dto = new PrDtlDTO();
        dto.setPrDtlId(entity.getPrDtlId());
        dto.setPrId(entity.getPrId());
        dto.setPrNo(entity.getPrNo());
        dto.setPrLineNo(entity.getPrLineNo());
        dto.setSupplierId(entity.getSupplierId());
        dto.setSupplierName(entity.getSupplierName());
        dto.setSupplierSiteId(entity.getSupplierSiteId());
        dto.setSupplierSiteName(entity.getSupplierSiteName());
        dto.setSupplierItemCd(entity.getSupplierItemCd());
        dto.setCurCd(entity.getCurCd());
        dto.setNewItemFlag(entity.getNewItemFlag());
        dto.setItemId(entity.getItemId());
        dto.setItemName(entity.getItemName());
        dto.setItemDescription(entity.getItemDescription());
        dto.setManufacturerPartNo(entity.getManufacturerPartNo());
        dto.setUomCode(entity.getUomCode());
        dto.setItemCategoryId(entity.getItemCategoryId());
        dto.setItemCategoryName(entity.getItemCategoryName());
        dto.setItemTypeId(entity.getItemTypeId());
        dto.setItemTypeName(entity.getItemTypeName());
        dto.setPrRequiredQty(entity.getPrRequiredQty());
        dto.setPrCancelQty(entity.getPrCancelQty());
        dto.setUnitPrice(entity.getUnitPrice());
        dto.setNeedByDt(entity.getNeedByDt());
        dto.setBasicAmt(entity.getBasicAmt());
        dto.setTaxCd1(entity.getTaxCd1());
        dto.setTaxRate1(entity.getTaxRate1());
        dto.setTaxAmt1(entity.getTaxAmt1());
        dto.setTaxCd2(entity.getTaxCd2());
        dto.setTaxRate2(entity.getTaxRate2());
        dto.setTaxAmt2(entity.getTaxAmt2());
        dto.setTaxCd3(entity.getTaxCd3());
        dto.setTaxRate3(entity.getTaxRate3());
        dto.setTaxAmt3(entity.getTaxAmt3());
        dto.setItemTotalTaxAmt(entity.getItemTotalTaxAmt());
        dto.setTotalAmt(entity.getTotalAmt());
        dto.setRemarks(entity.getRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setPoHdrId(entity.getPoHdrId());
        dto.setPoNo(entity.getPoNo());
        dto.setExchRate(entity.getExchRate());
        dto.setLocalTotalAmt(entity.getLocalTotalAmt());
        return dto;
    }
}