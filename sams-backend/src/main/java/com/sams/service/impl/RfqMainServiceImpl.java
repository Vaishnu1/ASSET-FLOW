package com.sams.service.impl;

import com.sams.dto.RfqMainDTO;
import com.sams.entity.RfqMain;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.RfqMainRepository;
import com.sams.service.RfqMainService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RfqMainServiceImpl implements RfqMainService {

    private final RfqMainRepository repository;

    @Override
    @Transactional
    public RfqMainDTO create(RfqMainDTO dto) {
        RfqMain entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public RfqMainDTO getById(Long id) {
        RfqMain entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RfqMain not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<RfqMainDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RfqMainDTO update(Long id, RfqMainDTO dto) {
        RfqMain entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RfqMain not found with ID: " + id));
        RfqMain mapped = mapToEntity(dto);
        mapped.setRfqMainId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        RfqMain entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RfqMain not found with ID: " + id));
        repository.delete(entity);
    }

    private RfqMain mapToEntity(RfqMainDTO dto) {
        RfqMain entity = new RfqMain();
        entity.setRfqMainId(dto.getRfqMainId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocId(dto.getLocId());
        entity.setPoReqDtlId(dto.getPoReqDtlId());
        entity.setPoReqNo(dto.getPoReqNo());
        entity.setSrNo(dto.getSrNo());
        entity.setSrId(dto.getSrId());
        entity.setSuppId(dto.getSuppId());
        entity.setSuppName(dto.getSuppName());
        entity.setSuppEmail1Id(dto.getSuppEmail1Id());
        entity.setSuppEmail2Id(dto.getSuppEmail2Id());
        entity.setSuppAddress1(dto.getSuppAddress1());
        entity.setSuppAddress2(dto.getSuppAddress2());
        entity.setSuppCity(dto.getSuppCity());
        entity.setSuppState(dto.getSuppState());
        entity.setSuppCountry(dto.getSuppCountry());
        entity.setSuppPostalCd(dto.getSuppPostalCd());
        entity.setCustId(dto.getCustId());
        entity.setCustName(dto.getCustName());
        entity.setCustEmailId(dto.getCustEmailId());
        entity.setCustAddress1(dto.getCustAddress1());
        entity.setCustAddress2(dto.getCustAddress2());
        entity.setCustCity(dto.getCustCity());
        entity.setCustState(dto.getCustState());
        entity.setCustCountry(dto.getCustCountry());
        entity.setCustPostalCd(dto.getCustPostalCd());
        entity.setItemId(dto.getItemId());
        entity.setItemCd(dto.getItemCd());
        entity.setItemDescription(dto.getItemDescription());
        entity.setRcvQty(dto.getRcvQty());
        entity.setEstimatedPrice(dto.getEstimatedPrice());
        entity.setUnitPrice(dto.getUnitPrice());
        entity.setRfqValue(dto.getRfqValue());
        entity.setPaymentTerms(dto.getPaymentTerms());
        entity.setWarrantyCoverage(dto.getWarrantyCoverage());
        entity.setPackingForwarding(dto.getPackingForwarding());
        entity.setLeadTime(dto.getLeadTime());
        entity.setOtherInfo(dto.getOtherInfo());
        entity.setComments(dto.getComments());
        entity.setModel(dto.getModel());
        entity.setSuppEmail3Id(dto.getSuppEmail3Id());
        entity.setSuppEmail4Id(dto.getSuppEmail4Id());
        entity.setTaxCd1(dto.getTaxCd1());
        entity.setTaxRate1(dto.getTaxRate1());
        entity.setTaxAmt1(dto.getTaxAmt1());
        entity.setTaxCd2(dto.getTaxCd2());
        entity.setTaxRate2(dto.getTaxRate2());
        entity.setTaxAmt2(dto.getTaxAmt2());
        entity.setFinalRfq(dto.getFinalRfq());
        entity.setItemNetAmt(dto.getItemNetAmt());
        entity.setPoterm1(dto.getPoterm1());
        entity.setPartStatus(dto.getPartStatus());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private RfqMainDTO mapToDTO(RfqMain entity) {
        RfqMainDTO dto = new RfqMainDTO();
        dto.setRfqMainId(entity.getRfqMainId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocId(entity.getLocId());
        dto.setPoReqDtlId(entity.getPoReqDtlId());
        dto.setPoReqNo(entity.getPoReqNo());
        dto.setSrNo(entity.getSrNo());
        dto.setSrId(entity.getSrId());
        dto.setSuppId(entity.getSuppId());
        dto.setSuppName(entity.getSuppName());
        dto.setSuppEmail1Id(entity.getSuppEmail1Id());
        dto.setSuppEmail2Id(entity.getSuppEmail2Id());
        dto.setSuppAddress1(entity.getSuppAddress1());
        dto.setSuppAddress2(entity.getSuppAddress2());
        dto.setSuppCity(entity.getSuppCity());
        dto.setSuppState(entity.getSuppState());
        dto.setSuppCountry(entity.getSuppCountry());
        dto.setSuppPostalCd(entity.getSuppPostalCd());
        dto.setCustId(entity.getCustId());
        dto.setCustName(entity.getCustName());
        dto.setCustEmailId(entity.getCustEmailId());
        dto.setCustAddress1(entity.getCustAddress1());
        dto.setCustAddress2(entity.getCustAddress2());
        dto.setCustCity(entity.getCustCity());
        dto.setCustState(entity.getCustState());
        dto.setCustCountry(entity.getCustCountry());
        dto.setCustPostalCd(entity.getCustPostalCd());
        dto.setItemId(entity.getItemId());
        dto.setItemCd(entity.getItemCd());
        dto.setItemDescription(entity.getItemDescription());
        dto.setRcvQty(entity.getRcvQty());
        dto.setEstimatedPrice(entity.getEstimatedPrice());
        dto.setUnitPrice(entity.getUnitPrice());
        dto.setRfqValue(entity.getRfqValue());
        dto.setPaymentTerms(entity.getPaymentTerms());
        dto.setWarrantyCoverage(entity.getWarrantyCoverage());
        dto.setPackingForwarding(entity.getPackingForwarding());
        dto.setLeadTime(entity.getLeadTime());
        dto.setOtherInfo(entity.getOtherInfo());
        dto.setComments(entity.getComments());
        dto.setModel(entity.getModel());
        dto.setSuppEmail3Id(entity.getSuppEmail3Id());
        dto.setSuppEmail4Id(entity.getSuppEmail4Id());
        dto.setTaxCd1(entity.getTaxCd1());
        dto.setTaxRate1(entity.getTaxRate1());
        dto.setTaxAmt1(entity.getTaxAmt1());
        dto.setTaxCd2(entity.getTaxCd2());
        dto.setTaxRate2(entity.getTaxRate2());
        dto.setTaxAmt2(entity.getTaxAmt2());
        dto.setFinalRfq(entity.getFinalRfq());
        dto.setItemNetAmt(entity.getItemNetAmt());
        dto.setPoterm1(entity.getPoterm1());
        dto.setPartStatus(entity.getPartStatus());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}