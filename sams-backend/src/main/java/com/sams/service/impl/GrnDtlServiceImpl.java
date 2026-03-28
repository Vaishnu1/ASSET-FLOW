package com.sams.service.impl;

import com.sams.dto.GrnDtlDTO;
import com.sams.entity.GrnDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.GrnDtlRepository;
import com.sams.service.GrnDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GrnDtlServiceImpl implements GrnDtlService {

    private final GrnDtlRepository repository;

    @Override
    @Transactional
    public GrnDtlDTO create(GrnDtlDTO dto) {
        GrnDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public GrnDtlDTO getById(Long id) {
        GrnDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GrnDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<GrnDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public GrnDtlDTO update(Long id, GrnDtlDTO dto) {
        GrnDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GrnDtl not found with ID: " + id));
        GrnDtl mapped = mapToEntity(dto);
        mapped.setGrnDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        GrnDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GrnDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private GrnDtl mapToEntity(GrnDtlDTO dto) {
        GrnDtl entity = new GrnDtl();
        entity.setGrnDtlId(dto.getGrnDtlId());
        entity.setGrnId(dto.getGrnId());
        entity.setGrnNo(dto.getGrnNo());
        entity.setDoNo(dto.getDoNo());
        entity.setDoDt(dto.getDoDt());
        entity.setSupplierId(dto.getSupplierId());
        entity.setSupplierName(dto.getSupplierName());
        entity.setSupplierSiteId(dto.getSupplierSiteId());
        entity.setSupplierSiteName(dto.getSupplierSiteName());
        entity.setPoId(dto.getPoId());
        entity.setPoNo(dto.getPoNo());
        entity.setPoReqNo(dto.getPoReqNo());
        entity.setPoLineId(dto.getPoLineId());
        entity.setPoLineNo(dto.getPoLineNo());
        entity.setPoDt(dto.getPoDt());
        entity.setItemId(dto.getItemId());
        entity.setItemName(dto.getItemName());
        entity.setDescription(dto.getDescription());
        entity.setMakerPartCode(dto.getMakerPartCode());
        entity.setManufacturerPartNo(dto.getManufacturerPartNo());
        entity.setManufacturerName(dto.getManufacturerName());
        entity.setPoQuantity(dto.getPoQuantity());
        entity.setPoBalQty(dto.getPoBalQty());
        entity.setAcceptQty(dto.getAcceptQty());
        entity.setRejectQty(dto.getRejectQty());
        entity.setRcvQty(dto.getRcvQty());
        entity.setTaxAmt1(dto.getTaxAmt1());
        entity.setTaxAmt2(dto.getTaxAmt2());
        entity.setTaxAmt3(dto.getTaxAmt3());
        entity.setUomCd(dto.getUomCd());
        entity.setStoreId(dto.getStoreId());
        entity.setStoreName(dto.getStoreName());
        entity.setUnitPrice(dto.getUnitPrice());
        entity.setItemQtyPrice(dto.getItemQtyPrice());
        entity.setItemTax(dto.getItemTax());
        entity.setRejectReasonId(dto.getRejectReasonId());
        entity.setRtvFlag(dto.getRtvFlag());
        entity.setIqcCompleted(dto.getIqcCompleted());
        entity.setIqcRequired(dto.getIqcRequired());
        entity.setCancelFlag(dto.getCancelFlag());
        entity.setRejectReason(dto.getRejectReason());
        entity.setConfirmApproval(dto.getConfirmApproval());
        entity.setUploadToInventory(dto.getUploadToInventory());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setRtvQty(dto.getRtvQty());
        entity.setAssetHdrId(dto.getAssetHdrId());
        entity.setAssetCode(dto.getAssetCode());
        entity.setSrId(dto.getSrId());
        entity.setSrNo(dto.getSrNo());
        entity.setItemTypeId(dto.getItemTypeId());
        entity.setItemTypeName(dto.getItemTypeName());
        entity.setPoType(dto.getPoType());
        return entity;
    }

    private GrnDtlDTO mapToDTO(GrnDtl entity) {
        GrnDtlDTO dto = new GrnDtlDTO();
        dto.setGrnDtlId(entity.getGrnDtlId());
        dto.setGrnId(entity.getGrnId());
        dto.setGrnNo(entity.getGrnNo());
        dto.setDoNo(entity.getDoNo());
        dto.setDoDt(entity.getDoDt());
        dto.setSupplierId(entity.getSupplierId());
        dto.setSupplierName(entity.getSupplierName());
        dto.setSupplierSiteId(entity.getSupplierSiteId());
        dto.setSupplierSiteName(entity.getSupplierSiteName());
        dto.setPoId(entity.getPoId());
        dto.setPoNo(entity.getPoNo());
        dto.setPoReqNo(entity.getPoReqNo());
        dto.setPoLineId(entity.getPoLineId());
        dto.setPoLineNo(entity.getPoLineNo());
        dto.setPoDt(entity.getPoDt());
        dto.setItemId(entity.getItemId());
        dto.setItemName(entity.getItemName());
        dto.setDescription(entity.getDescription());
        dto.setMakerPartCode(entity.getMakerPartCode());
        dto.setManufacturerPartNo(entity.getManufacturerPartNo());
        dto.setManufacturerName(entity.getManufacturerName());
        dto.setPoQuantity(entity.getPoQuantity());
        dto.setPoBalQty(entity.getPoBalQty());
        dto.setAcceptQty(entity.getAcceptQty());
        dto.setRejectQty(entity.getRejectQty());
        dto.setRcvQty(entity.getRcvQty());
        dto.setTaxAmt1(entity.getTaxAmt1());
        dto.setTaxAmt2(entity.getTaxAmt2());
        dto.setTaxAmt3(entity.getTaxAmt3());
        dto.setUomCd(entity.getUomCd());
        dto.setStoreId(entity.getStoreId());
        dto.setStoreName(entity.getStoreName());
        dto.setUnitPrice(entity.getUnitPrice());
        dto.setItemQtyPrice(entity.getItemQtyPrice());
        dto.setItemTax(entity.getItemTax());
        dto.setRejectReasonId(entity.getRejectReasonId());
        dto.setRtvFlag(entity.getRtvFlag());
        dto.setIqcCompleted(entity.getIqcCompleted());
        dto.setIqcRequired(entity.getIqcRequired());
        dto.setCancelFlag(entity.getCancelFlag());
        dto.setRejectReason(entity.getRejectReason());
        dto.setConfirmApproval(entity.getConfirmApproval());
        dto.setUploadToInventory(entity.getUploadToInventory());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setRtvQty(entity.getRtvQty());
        dto.setAssetHdrId(entity.getAssetHdrId());
        dto.setAssetCode(entity.getAssetCode());
        dto.setSrId(entity.getSrId());
        dto.setSrNo(entity.getSrNo());
        dto.setItemTypeId(entity.getItemTypeId());
        dto.setItemTypeName(entity.getItemTypeName());
        dto.setPoType(entity.getPoType());
        return dto;
    }
}