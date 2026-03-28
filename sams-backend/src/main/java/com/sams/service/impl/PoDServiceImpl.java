package com.sams.service.impl;

import com.sams.dto.PoDDTO;
import com.sams.entity.PoD;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PoDRepository;
import com.sams.service.PoDService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PoDServiceImpl implements PoDService {

    private final PoDRepository repository;

    @Override
    @Transactional
    public PoDDTO create(PoDDTO dto) {
        PoD entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PoDDTO getById(Long id) {
        PoD entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoD not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PoDDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PoDDTO update(Long id, PoDDTO dto) {
        PoD entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoD not found with ID: " + id));
        PoD mapped = mapToEntity(dto);
        mapped.setPoDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PoD entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoD not found with ID: " + id));
        repository.delete(entity);
    }

    private PoD mapToEntity(PoDDTO dto) {
        PoD entity = new PoD();
        entity.setPoDtlId(dto.getPoDtlId());
        entity.setPoId(dto.getPoId());
        entity.setPoNo(dto.getPoNo());
        entity.setPoLineNo(dto.getPoLineNo());
        entity.setItemId(dto.getItemId());
        entity.setItemName(dto.getItemName());
        entity.setItemDesc(dto.getItemDesc());
        entity.setSuppItemCd(dto.getSuppItemCd());
        entity.setManufacturerPartNo(dto.getManufacturerPartNo());
        entity.setUomCd(dto.getUomCd());
        entity.setPoQty(dto.getPoQty());
        entity.setPoBalanceQty(dto.getPoBalanceQty());
        entity.setCancelQty(dto.getCancelQty());
        entity.setCancelReasonDesc(dto.getCancelReasonDesc());
        entity.setReceivedQty(dto.getReceivedQty());
        entity.setInvoicedQty(dto.getInvoicedQty());
        entity.setMasterUnitPrice(dto.getMasterUnitPrice());
        entity.setUnitPrice(dto.getUnitPrice());
        entity.setLocUnitPrice(dto.getLocUnitPrice());
        entity.setPoBasicAmt(dto.getPoBasicAmt());
        entity.setLocalPoBasicAmt(dto.getLocalPoBasicAmt());
        entity.setInspectionRequired(dto.getInspectionRequired());
        entity.setPoReqDt(dto.getPoReqDt());
        entity.setLastReceivedDt(dto.getLastReceivedDt());
        entity.setCustPoNo(dto.getCustPoNo());
        entity.setRemarks(dto.getRemarks());
        entity.setHoldFlg(dto.getHoldFlg());
        entity.setAssetHdrId(dto.getAssetHdrId());
        entity.setAssetCode(dto.getAssetCode());
        entity.setSrId(dto.getSrId());
        entity.setSrNo(dto.getSrNo());
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
        entity.setNetAmt(dto.getNetAmt());
        entity.setShipType(dto.getShipType());
        entity.setExpectedDeliveryDate(dto.getExpectedDeliveryDate());
        entity.setPrDtlId(dto.getPrDtlId());
        entity.setPrCancel(dto.getPrCancel());
        entity.setInvoiceRcvdDate(dto.getInvoiceRcvdDate());
        entity.setInvoiceClear(dto.getInvoiceClear());
        entity.setPendingInvAmnt(dto.getPendingInvAmnt());
        entity.setRejectQty(dto.getRejectQty());
        entity.setPoReqId(dto.getPoReqId());
        entity.setPoReqNo(dto.getPoReqNo());
        entity.setDelCfmDt(dto.getDelCfmDt());
        entity.setPoItemCancel(dto.getPoItemCancel());
        entity.setRtvQty(dto.getRtvQty());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setItemTypeId(dto.getItemTypeId());
        entity.setItemTypeName(dto.getItemTypeName());
        entity.setSerialNo(dto.getSerialNo());
        entity.setModelName(dto.getModelName());
        entity.setAssetGroupName(dto.getAssetGroupName());
        entity.setPoType(dto.getPoType());
        return entity;
    }

    private PoDDTO mapToDTO(PoD entity) {
        PoDDTO dto = new PoDDTO();
        dto.setPoDtlId(entity.getPoDtlId());
        dto.setPoId(entity.getPoId());
        dto.setPoNo(entity.getPoNo());
        dto.setPoLineNo(entity.getPoLineNo());
        dto.setItemId(entity.getItemId());
        dto.setItemName(entity.getItemName());
        dto.setItemDesc(entity.getItemDesc());
        dto.setSuppItemCd(entity.getSuppItemCd());
        dto.setManufacturerPartNo(entity.getManufacturerPartNo());
        dto.setUomCd(entity.getUomCd());
        dto.setPoQty(entity.getPoQty());
        dto.setPoBalanceQty(entity.getPoBalanceQty());
        dto.setCancelQty(entity.getCancelQty());
        dto.setCancelReasonDesc(entity.getCancelReasonDesc());
        dto.setReceivedQty(entity.getReceivedQty());
        dto.setInvoicedQty(entity.getInvoicedQty());
        dto.setMasterUnitPrice(entity.getMasterUnitPrice());
        dto.setUnitPrice(entity.getUnitPrice());
        dto.setLocUnitPrice(entity.getLocUnitPrice());
        dto.setPoBasicAmt(entity.getPoBasicAmt());
        dto.setLocalPoBasicAmt(entity.getLocalPoBasicAmt());
        dto.setInspectionRequired(entity.getInspectionRequired());
        dto.setPoReqDt(entity.getPoReqDt());
        dto.setLastReceivedDt(entity.getLastReceivedDt());
        dto.setCustPoNo(entity.getCustPoNo());
        dto.setRemarks(entity.getRemarks());
        dto.setHoldFlg(entity.getHoldFlg());
        dto.setAssetHdrId(entity.getAssetHdrId());
        dto.setAssetCode(entity.getAssetCode());
        dto.setSrId(entity.getSrId());
        dto.setSrNo(entity.getSrNo());
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
        dto.setNetAmt(entity.getNetAmt());
        dto.setShipType(entity.getShipType());
        dto.setExpectedDeliveryDate(entity.getExpectedDeliveryDate());
        dto.setPrDtlId(entity.getPrDtlId());
        dto.setPrCancel(entity.getPrCancel());
        dto.setInvoiceRcvdDate(entity.getInvoiceRcvdDate());
        dto.setInvoiceClear(entity.getInvoiceClear());
        dto.setPendingInvAmnt(entity.getPendingInvAmnt());
        dto.setRejectQty(entity.getRejectQty());
        dto.setPoReqId(entity.getPoReqId());
        dto.setPoReqNo(entity.getPoReqNo());
        dto.setDelCfmDt(entity.getDelCfmDt());
        dto.setPoItemCancel(entity.getPoItemCancel());
        dto.setRtvQty(entity.getRtvQty());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setItemTypeId(entity.getItemTypeId());
        dto.setItemTypeName(entity.getItemTypeName());
        dto.setSerialNo(entity.getSerialNo());
        dto.setModelName(entity.getModelName());
        dto.setAssetGroupName(entity.getAssetGroupName());
        dto.setPoType(entity.getPoType());
        return dto;
    }
}