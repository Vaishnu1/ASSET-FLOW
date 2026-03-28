package com.sams.service.impl;

import com.sams.dto.PoTermsAndConditionsDTO;
import com.sams.entity.PoTermsAndConditions;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PoTermsAndConditionsRepository;
import com.sams.service.PoTermsAndConditionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PoTermsAndConditionsServiceImpl implements PoTermsAndConditionsService {

    private final PoTermsAndConditionsRepository repository;

    @Override
    @Transactional
    public PoTermsAndConditionsDTO create(PoTermsAndConditionsDTO dto) {
        PoTermsAndConditions entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PoTermsAndConditionsDTO getById(Long id) {
        PoTermsAndConditions entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoTermsAndConditions not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PoTermsAndConditionsDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PoTermsAndConditionsDTO update(Long id, PoTermsAndConditionsDTO dto) {
        PoTermsAndConditions entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoTermsAndConditions not found with ID: " + id));
        PoTermsAndConditions mapped = mapToEntity(dto);
        mapped.setPoTermsAndConditionsId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PoTermsAndConditions entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoTermsAndConditions not found with ID: " + id));
        repository.delete(entity);
    }

    private PoTermsAndConditions mapToEntity(PoTermsAndConditionsDTO dto) {
        PoTermsAndConditions entity = new PoTermsAndConditions();
        entity.setPoTermsAndConditionsId(dto.getPoTermsAndConditionsId());
        entity.setPoHdrId(dto.getPoHdrId());
        entity.setPaymentTerms(dto.getPaymentTerms());
        entity.setAdvancePaymentPercentage(dto.getAdvancePaymentPercentage());
        entity.setAdvancePaymentCoverage(dto.getAdvancePaymentCoverage());
        entity.setCreditPaymnetType(dto.getCreditPaymnetType());
        entity.setExpectedArrivalDate(dto.getExpectedArrivalDate());
        entity.setLongTermCreditDays(dto.getLongTermCreditDays());
        entity.setWarrantyTerms(dto.getWarrantyTerms());
        entity.setFreightChargesIndluded(dto.getFreightChargesIndluded());
        entity.setFrieghtChargesCoverage(dto.getFrieghtChargesCoverage());
        entity.setInsuranceCovered(dto.getInsuranceCovered());
        entity.setInsuranceCoverageTerms(dto.getInsuranceCoverageTerms());
        entity.setTaxIncluded(dto.getTaxIncluded());
        entity.setTaxCoverageTerms(dto.getTaxCoverageTerms());
        entity.setSpecialTermsAvailable(dto.getSpecialTermsAvailable());
        entity.setSpecialTerms(dto.getSpecialTerms());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setQuoteReferenceNo(dto.getQuoteReferenceNo());
        entity.setPaymentTermsAndConditionsString(dto.getPaymentTermsAndConditionsString());
        entity.setFreightChargesString(dto.getFreightChargesString());
        entity.setInsuranceCoveredString(dto.getInsuranceCoveredString());
        entity.setTaxIncludedString(dto.getTaxIncludedString());
        entity.setSpecialTermsString(dto.getSpecialTermsString());
        entity.setShortTermCreditDays(dto.getShortTermCreditDays());
        return entity;
    }

    private PoTermsAndConditionsDTO mapToDTO(PoTermsAndConditions entity) {
        PoTermsAndConditionsDTO dto = new PoTermsAndConditionsDTO();
        dto.setPoTermsAndConditionsId(entity.getPoTermsAndConditionsId());
        dto.setPoHdrId(entity.getPoHdrId());
        dto.setPaymentTerms(entity.getPaymentTerms());
        dto.setAdvancePaymentPercentage(entity.getAdvancePaymentPercentage());
        dto.setAdvancePaymentCoverage(entity.getAdvancePaymentCoverage());
        dto.setCreditPaymnetType(entity.getCreditPaymnetType());
        dto.setExpectedArrivalDate(entity.getExpectedArrivalDate());
        dto.setLongTermCreditDays(entity.getLongTermCreditDays());
        dto.setWarrantyTerms(entity.getWarrantyTerms());
        dto.setFreightChargesIndluded(entity.getFreightChargesIndluded());
        dto.setFrieghtChargesCoverage(entity.getFrieghtChargesCoverage());
        dto.setInsuranceCovered(entity.getInsuranceCovered());
        dto.setInsuranceCoverageTerms(entity.getInsuranceCoverageTerms());
        dto.setTaxIncluded(entity.getTaxIncluded());
        dto.setTaxCoverageTerms(entity.getTaxCoverageTerms());
        dto.setSpecialTermsAvailable(entity.getSpecialTermsAvailable());
        dto.setSpecialTerms(entity.getSpecialTerms());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setQuoteReferenceNo(entity.getQuoteReferenceNo());
        dto.setPaymentTermsAndConditionsString(entity.getPaymentTermsAndConditionsString());
        dto.setFreightChargesString(entity.getFreightChargesString());
        dto.setInsuranceCoveredString(entity.getInsuranceCoveredString());
        dto.setTaxIncludedString(entity.getTaxIncludedString());
        dto.setSpecialTermsString(entity.getSpecialTermsString());
        dto.setShortTermCreditDays(entity.getShortTermCreditDays());
        return dto;
    }
}