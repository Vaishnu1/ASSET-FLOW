package com.sams.service.impl;

import com.sams.dto.ContractHeaderDTO;
import com.sams.entity.ContractHeader;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ContractHeaderRepository;
import com.sams.service.ContractHeaderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContractHeaderServiceImpl implements ContractHeaderService {

    private final ContractHeaderRepository repository;

    @Override
    @Transactional
    public ContractHeaderDTO createContractHeader(ContractHeaderDTO dto) {
        ContractHeader entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ContractHeaderDTO getContractHeaderById(Long id) {
        ContractHeader entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractHeader not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ContractHeaderDTO> getAllContractHeaders() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ContractHeaderDTO updateContractHeader(Long id, ContractHeaderDTO dto) {
        ContractHeader entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractHeader not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        ContractHeader mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteContractHeader(Long id) {
        ContractHeader entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractHeader not found with ID: " + id));
        repository.delete(entity);
    }

    private ContractHeader mapToEntity(ContractHeaderDTO dto) {
        ContractHeader entity = new ContractHeader();
        entity.setColumnName(dto.getColumnName());
        entity.setDirection(dto.getDirection());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setContractHdrId(dto.getContractHdrId());
        entity.setContractNo(dto.getContractNo());
        entity.setContractName(dto.getContractName());
        entity.setContractType(dto.getContractType());
        entity.setCoverageType(dto.getCoverageType());
        entity.setContractingPartyType(dto.getContractingPartyType());
        entity.setContractPartyId(dto.getContractPartyId());
        entity.setContractPartyName(dto.getContractPartyName());
        entity.setContractPartyLocationId(dto.getContractPartyLocationId());
        entity.setContractPartyLocationName(dto.getContractPartyLocationName());
        entity.setActive(dto.getActive());
        entity.setTermsConditions(dto.getTermsConditions());
        entity.setContactPerson(dto.getContactPerson());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setCurCd(dto.getCurCd());
        entity.setContractStartDt(dto.getContractStartDt());
        entity.setContractStartDtDisp(dto.getContractStartDtDisp());
        entity.setContractEndDt(dto.getContractEndDt());
        entity.setContractEndDtDisp(dto.getContractEndDtDisp());
        entity.setExpiryPriorNotifyDays(dto.getExpiryPriorNotifyDays());
        entity.setContractBasicValue(dto.getContractBasicValue());
        entity.setDiscountRate(dto.getDiscountRate());
        entity.setDiscountAmt(dto.getDiscountAmt());
        entity.setContractGrossValue(dto.getContractGrossValue());
        entity.setTaxCode1(dto.getTaxCode1());
        entity.setTaxCode2(dto.getTaxCode2());
        entity.setTaxCode3(dto.getTaxCode3());
        entity.setTaxRate1(dto.getTaxRate1());
        entity.setTaxRate2(dto.getTaxRate2());
        entity.setTaxValue1(dto.getTaxValue1());
        entity.setTaxValue2(dto.getTaxValue2());
        entity.setNetContractValue(dto.getNetContractValue());
        entity.setIncludedService(dto.getIncludedService());
        entity.setExcludedService(dto.getExcludedService());
        entity.setAutoRenewal(dto.getAutoRenewal());
        entity.setExpiredContracts(dto.getExpiredContracts());
        entity.setIntervalBasedContract(dto.getIntervalBasedContract());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setOrgId(dto.getOrgId());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setLogInUserOrgId(dto.getLogInUserOrgId());
        entity.setLogInUserLocId(dto.getLogInUserLocId());
        entity.setLogInUserId(dto.getLogInUserId());
        entity.setAssetList(dto.getAssetList());
        entity.setSearchValue(dto.getSearchValue());
        entity.setSearchValue1(dto.getSearchValue1());
        entity.setContractStatus(dto.getContractStatus());
        entity.setContractStatusId(dto.getContractStatusId());
        entity.setDaysElapsed(dto.getDaysElapsed());
        entity.setApprovalId(dto.getApprovalId());
        entity.setContractWithoutPrice(dto.getContractWithoutPrice());
        entity.setContractWithoutSupplier(dto.getContractWithoutSupplier());
        entity.setProcessStatus(dto.getProcessStatus());
        entity.setWorkflowProcessStatusId(dto.getWorkflowProcessStatusId());
        entity.setSelectedLocationIds(dto.getSelectedLocationIds());
        entity.setSelectedLocationNames(dto.getSelectedLocationNames());
        return entity;
    }

    private ContractHeaderDTO mapToDTO(ContractHeader entity) {
        ContractHeaderDTO dto = new ContractHeaderDTO();
        dto.setId(entity.getId());
        dto.setColumnName(entity.getColumnName());
        dto.setDirection(entity.getDirection());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setContractHdrId(entity.getContractHdrId());
        dto.setContractNo(entity.getContractNo());
        dto.setContractName(entity.getContractName());
        dto.setContractType(entity.getContractType());
        dto.setCoverageType(entity.getCoverageType());
        dto.setContractingPartyType(entity.getContractingPartyType());
        dto.setContractPartyId(entity.getContractPartyId());
        dto.setContractPartyName(entity.getContractPartyName());
        dto.setContractPartyLocationId(entity.getContractPartyLocationId());
        dto.setContractPartyLocationName(entity.getContractPartyLocationName());
        dto.setActive(entity.getActive());
        dto.setTermsConditions(entity.getTermsConditions());
        dto.setContactPerson(entity.getContactPerson());
        dto.setPhoneNumber(entity.getPhoneNumber());
        dto.setCurCd(entity.getCurCd());
        dto.setContractStartDt(entity.getContractStartDt());
        dto.setContractStartDtDisp(entity.getContractStartDtDisp());
        dto.setContractEndDt(entity.getContractEndDt());
        dto.setContractEndDtDisp(entity.getContractEndDtDisp());
        dto.setExpiryPriorNotifyDays(entity.getExpiryPriorNotifyDays());
        dto.setContractBasicValue(entity.getContractBasicValue());
        dto.setDiscountRate(entity.getDiscountRate());
        dto.setDiscountAmt(entity.getDiscountAmt());
        dto.setContractGrossValue(entity.getContractGrossValue());
        dto.setTaxCode1(entity.getTaxCode1());
        dto.setTaxCode2(entity.getTaxCode2());
        dto.setTaxCode3(entity.getTaxCode3());
        dto.setTaxRate1(entity.getTaxRate1());
        dto.setTaxRate2(entity.getTaxRate2());
        dto.setTaxValue1(entity.getTaxValue1());
        dto.setTaxValue2(entity.getTaxValue2());
        dto.setNetContractValue(entity.getNetContractValue());
        dto.setIncludedService(entity.getIncludedService());
        dto.setExcludedService(entity.getExcludedService());
        dto.setAutoRenewal(entity.getAutoRenewal());
        dto.setExpiredContracts(entity.getExpiredContracts());
        dto.setIntervalBasedContract(entity.getIntervalBasedContract());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setOrgId(entity.getOrgId());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setLogInUserOrgId(entity.getLogInUserOrgId());
        dto.setLogInUserLocId(entity.getLogInUserLocId());
        dto.setLogInUserId(entity.getLogInUserId());
        dto.setAssetList(entity.getAssetList());
        dto.setSearchValue(entity.getSearchValue());
        dto.setSearchValue1(entity.getSearchValue1());
        dto.setContractStatus(entity.getContractStatus());
        dto.setContractStatusId(entity.getContractStatusId());
        dto.setDaysElapsed(entity.getDaysElapsed());
        dto.setApprovalId(entity.getApprovalId());
        dto.setContractWithoutPrice(entity.getContractWithoutPrice());
        dto.setContractWithoutSupplier(entity.getContractWithoutSupplier());
        dto.setProcessStatus(entity.getProcessStatus());
        dto.setWorkflowProcessStatusId(entity.getWorkflowProcessStatusId());
        dto.setSelectedLocationIds(entity.getSelectedLocationIds());
        dto.setSelectedLocationNames(entity.getSelectedLocationNames());
        return dto;
    }
}