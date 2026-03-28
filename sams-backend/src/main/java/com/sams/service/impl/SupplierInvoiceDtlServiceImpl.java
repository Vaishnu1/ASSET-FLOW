package com.sams.service.impl;

import com.sams.dto.SupplierInvoiceDtlDTO;
import com.sams.entity.SupplierInvoiceDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SupplierInvoiceDtlRepository;
import com.sams.service.SupplierInvoiceDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierInvoiceDtlServiceImpl implements SupplierInvoiceDtlService {

    private final SupplierInvoiceDtlRepository repository;

    @Override
    @Transactional
    public SupplierInvoiceDtlDTO create(SupplierInvoiceDtlDTO dto) {
        SupplierInvoiceDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SupplierInvoiceDtlDTO getById(Long id) {
        SupplierInvoiceDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierInvoiceDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SupplierInvoiceDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SupplierInvoiceDtlDTO update(Long id, SupplierInvoiceDtlDTO dto) {
        SupplierInvoiceDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierInvoiceDtl not found with ID: " + id));
        SupplierInvoiceDtl mapped = mapToEntity(dto);
        mapped.setSupplierInvoiceDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SupplierInvoiceDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierInvoiceDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private SupplierInvoiceDtl mapToEntity(SupplierInvoiceDtlDTO dto) {
        SupplierInvoiceDtl entity = new SupplierInvoiceDtl();
        entity.setSupplierInvoiceDtlId(dto.getSupplierInvoiceDtlId());
        entity.setSupplierInvoiceHdrId(dto.getSupplierInvoiceHdrId());
        entity.setPoDtlId(dto.getPoDtlId());
        entity.setPoNo(dto.getPoNo());
        entity.setPoLineNo(dto.getPoLineNo());
        entity.setReceiptsNo(dto.getReceiptsNo());
        entity.setRcvDtlId(dto.getRcvDtlId());
        entity.setItemId(dto.getItemId());
        entity.setItemCd(dto.getItemCd());
        entity.setItemDesc(dto.getItemDesc());
        entity.setSupplierItemCd(dto.getSupplierItemCd());
        entity.setUomCd(dto.getUomCd());
        entity.setPoQty(dto.getPoQty());
        entity.setGrnQty(dto.getGrnQty());
        entity.setInvoiceQty(dto.getInvoiceQty());
        entity.setPoUnitPrice(dto.getPoUnitPrice());
        entity.setInvoiceUnitPrice(dto.getInvoiceUnitPrice());
        entity.setBasicInvAmt(dto.getBasicInvAmt());
        entity.setTaxCd1(dto.getTaxCd1());
        entity.setTaxRate1(dto.getTaxRate1());
        entity.setTaxAmt1(dto.getTaxAmt1());
        entity.setTaxCd2(dto.getTaxCd2());
        entity.setTaxRate2(dto.getTaxRate2());
        entity.setTaxAmt2(dto.getTaxAmt2());
        entity.setTotalTaxAmt(dto.getTotalTaxAmt());
        entity.setTotalInvAmt(dto.getTotalInvAmt());
        entity.setMatchedFlag(dto.getMatchedFlag());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setAssetHdrId(dto.getAssetHdrId());
        entity.setAssetCode(dto.getAssetCode());
        entity.setSrId(dto.getSrId());
        entity.setSrNo(dto.getSrNo());
        entity.setPoType(dto.getPoType());
        return entity;
    }

    private SupplierInvoiceDtlDTO mapToDTO(SupplierInvoiceDtl entity) {
        SupplierInvoiceDtlDTO dto = new SupplierInvoiceDtlDTO();
        dto.setSupplierInvoiceDtlId(entity.getSupplierInvoiceDtlId());
        dto.setSupplierInvoiceHdrId(entity.getSupplierInvoiceHdrId());
        dto.setPoDtlId(entity.getPoDtlId());
        dto.setPoNo(entity.getPoNo());
        dto.setPoLineNo(entity.getPoLineNo());
        dto.setReceiptsNo(entity.getReceiptsNo());
        dto.setRcvDtlId(entity.getRcvDtlId());
        dto.setItemId(entity.getItemId());
        dto.setItemCd(entity.getItemCd());
        dto.setItemDesc(entity.getItemDesc());
        dto.setSupplierItemCd(entity.getSupplierItemCd());
        dto.setUomCd(entity.getUomCd());
        dto.setPoQty(entity.getPoQty());
        dto.setGrnQty(entity.getGrnQty());
        dto.setInvoiceQty(entity.getInvoiceQty());
        dto.setPoUnitPrice(entity.getPoUnitPrice());
        dto.setInvoiceUnitPrice(entity.getInvoiceUnitPrice());
        dto.setBasicInvAmt(entity.getBasicInvAmt());
        dto.setTaxCd1(entity.getTaxCd1());
        dto.setTaxRate1(entity.getTaxRate1());
        dto.setTaxAmt1(entity.getTaxAmt1());
        dto.setTaxCd2(entity.getTaxCd2());
        dto.setTaxRate2(entity.getTaxRate2());
        dto.setTaxAmt2(entity.getTaxAmt2());
        dto.setTotalTaxAmt(entity.getTotalTaxAmt());
        dto.setTotalInvAmt(entity.getTotalInvAmt());
        dto.setMatchedFlag(entity.getMatchedFlag());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setAssetHdrId(entity.getAssetHdrId());
        dto.setAssetCode(entity.getAssetCode());
        dto.setSrId(entity.getSrId());
        dto.setSrNo(entity.getSrNo());
        dto.setPoType(entity.getPoType());
        return dto;
    }
}