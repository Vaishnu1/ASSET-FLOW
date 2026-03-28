package com.sams.service.impl;

import com.sams.dto.ContractDTO;
import com.sams.entity.Contract;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ContractRepository;
import com.sams.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContractServiceImpl implements ContractService {

    private final ContractRepository repository;

    @Override
    @Transactional
    public ContractDTO create(ContractDTO dto) {
        Contract entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ContractDTO getById(Long id) {
        Contract entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Contract not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ContractDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ContractDTO update(Long id, ContractDTO dto) {
        Contract entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Contract not found with ID: " + id));
        Contract mapped = mapToEntity(dto);
        mapped.setContractId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Contract entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Contract not found with ID: " + id));
        repository.delete(entity);
    }

    private Contract mapToEntity(ContractDTO dto) {
        Contract entity = new Contract();
        entity.setContractId(dto.getContractId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setContractNo(dto.getContractNo());
        entity.setContractName(dto.getContractName());
        entity.setCoverageType(dto.getCoverageType());
        entity.setContractType(dto.getContractType());
        entity.setContractStatusId(dto.getContractStatusId());
        entity.setActive(dto.getActive());
        entity.setContractingPartyType(dto.getContractingPartyType());
        entity.setContractPartyId(dto.getContractPartyId());
        entity.setContractPartyName(dto.getContractPartyName());
        entity.setContractPartyLocationId(dto.getContractPartyLocationId());
        entity.setContractPartyLocationName(dto.getContractPartyLocationName());
        entity.setContactPersonId(dto.getContactPersonId());
        entity.setContactPerson(dto.getContactPerson());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setCurrencyCode(dto.getCurrencyCode());
        entity.setStartDt(dto.getStartDt());
        entity.setEndDt(dto.getEndDt());
        entity.setExpiryPriorNotifyDays(dto.getExpiryPriorNotifyDays());
        entity.setPoNo(dto.getPoNo());
        entity.setPoDate(dto.getPoDate());
        entity.setContractInactiveOn(dto.getContractInactiveOn());
        entity.setContractBasicValue(dto.getContractBasicValue());
        entity.setDiscountRate(dto.getDiscountRate());
        entity.setDiscountAmount(dto.getDiscountAmount());
        entity.setGrossContractValue(dto.getGrossContractValue());
        entity.setTaxCd1(dto.getTaxCd1());
        entity.setTaxCd2(dto.getTaxCd2());
        entity.setTaxCd3(dto.getTaxCd3());
        entity.setTaxRate1(dto.getTaxRate1());
        entity.setTaxRate2(dto.getTaxRate2());
        entity.setTaxRate3(dto.getTaxRate3());
        entity.setTaxValue1(dto.getTaxValue1());
        entity.setTaxValue2(dto.getTaxValue2());
        entity.setTaxValue3(dto.getTaxValue3());
        entity.setNetContractValue(dto.getNetContractValue());
        entity.setIncludedService(dto.getIncludedService());
        entity.setExcludedService(dto.getExcludedService());
        entity.setAutoRenewal(dto.getAutoRenewal());
        entity.setAppreciationCoeffecient(dto.getAppreciationCoeffecient());
        entity.setAutoRenewCreated(dto.getAutoRenewCreated());
        entity.setRemarks(dto.getRemarks());
        entity.setTenurePaymentFrequency(dto.getTenurePaymentFrequency());
        entity.setTenurePaymentOccurances(dto.getTenurePaymentOccurances());
        entity.setTermsCondition(dto.getTermsCondition());
        entity.setApprovedBy(dto.getApprovedBy());
        entity.setApprovedDt(dto.getApprovedDt());
        entity.setCancelledBy(dto.getCancelledBy());
        entity.setCancelledDt(dto.getCancelledDt());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setEmailId(dto.getEmailId());
        entity.setAddressInfo(dto.getAddressInfo());
        entity.setExchRate(dto.getExchRate());
        entity.setLocalNetContractValue(dto.getLocalNetContractValue());
        entity.setCancelReason(dto.getCancelReason());
        entity.setRejectReason(dto.getRejectReason());
        entity.setWorkFlowProcessStatusId(dto.getWorkFlowProcessStatusId());
        entity.setTerminateReason(dto.getTerminateReason());
        entity.setInsuranceType(dto.getInsuranceType());
        return entity;
    }

    private ContractDTO mapToDTO(Contract entity) {
        ContractDTO dto = new ContractDTO();
        dto.setContractId(entity.getContractId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setContractNo(entity.getContractNo());
        dto.setContractName(entity.getContractName());
        dto.setCoverageType(entity.getCoverageType());
        dto.setContractType(entity.getContractType());
        dto.setContractStatusId(entity.getContractStatusId());
        dto.setActive(entity.getActive());
        dto.setContractingPartyType(entity.getContractingPartyType());
        dto.setContractPartyId(entity.getContractPartyId());
        dto.setContractPartyName(entity.getContractPartyName());
        dto.setContractPartyLocationId(entity.getContractPartyLocationId());
        dto.setContractPartyLocationName(entity.getContractPartyLocationName());
        dto.setContactPersonId(entity.getContactPersonId());
        dto.setContactPerson(entity.getContactPerson());
        dto.setPhoneNumber(entity.getPhoneNumber());
        dto.setCurrencyCode(entity.getCurrencyCode());
        dto.setStartDt(entity.getStartDt());
        dto.setEndDt(entity.getEndDt());
        dto.setExpiryPriorNotifyDays(entity.getExpiryPriorNotifyDays());
        dto.setPoNo(entity.getPoNo());
        dto.setPoDate(entity.getPoDate());
        dto.setContractInactiveOn(entity.getContractInactiveOn());
        dto.setContractBasicValue(entity.getContractBasicValue());
        dto.setDiscountRate(entity.getDiscountRate());
        dto.setDiscountAmount(entity.getDiscountAmount());
        dto.setGrossContractValue(entity.getGrossContractValue());
        dto.setTaxCd1(entity.getTaxCd1());
        dto.setTaxCd2(entity.getTaxCd2());
        dto.setTaxCd3(entity.getTaxCd3());
        dto.setTaxRate1(entity.getTaxRate1());
        dto.setTaxRate2(entity.getTaxRate2());
        dto.setTaxRate3(entity.getTaxRate3());
        dto.setTaxValue1(entity.getTaxValue1());
        dto.setTaxValue2(entity.getTaxValue2());
        dto.setTaxValue3(entity.getTaxValue3());
        dto.setNetContractValue(entity.getNetContractValue());
        dto.setIncludedService(entity.getIncludedService());
        dto.setExcludedService(entity.getExcludedService());
        dto.setAutoRenewal(entity.getAutoRenewal());
        dto.setAppreciationCoeffecient(entity.getAppreciationCoeffecient());
        dto.setAutoRenewCreated(entity.getAutoRenewCreated());
        dto.setRemarks(entity.getRemarks());
        dto.setTenurePaymentFrequency(entity.getTenurePaymentFrequency());
        dto.setTenurePaymentOccurances(entity.getTenurePaymentOccurances());
        dto.setTermsCondition(entity.getTermsCondition());
        dto.setApprovedBy(entity.getApprovedBy());
        dto.setApprovedDt(entity.getApprovedDt());
        dto.setCancelledBy(entity.getCancelledBy());
        dto.setCancelledDt(entity.getCancelledDt());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setEmailId(entity.getEmailId());
        dto.setAddressInfo(entity.getAddressInfo());
        dto.setExchRate(entity.getExchRate());
        dto.setLocalNetContractValue(entity.getLocalNetContractValue());
        dto.setCancelReason(entity.getCancelReason());
        dto.setRejectReason(entity.getRejectReason());
        dto.setWorkFlowProcessStatusId(entity.getWorkFlowProcessStatusId());
        dto.setTerminateReason(entity.getTerminateReason());
        dto.setInsuranceType(entity.getInsuranceType());
        return dto;
    }
}