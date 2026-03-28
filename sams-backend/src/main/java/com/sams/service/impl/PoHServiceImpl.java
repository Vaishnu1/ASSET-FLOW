package com.sams.service.impl;

import com.sams.dto.PoHDTO;
import com.sams.entity.PoH;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PoHRepository;
import com.sams.service.PoHService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PoHServiceImpl implements PoHService {

    private final PoHRepository repository;

    @Override
    @Transactional
    public PoHDTO create(PoHDTO dto) {
        PoH entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PoHDTO getById(Long id) {
        PoH entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoH not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PoHDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PoHDTO update(Long id, PoHDTO dto) {
        PoH entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoH not found with ID: " + id));
        PoH mapped = mapToEntity(dto);
        mapped.setPoId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PoH entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoH not found with ID: " + id));
        repository.delete(entity);
    }

    private PoH mapToEntity(PoHDTO dto) {
        PoH entity = new PoH();
        entity.setPoId(dto.getPoId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setSrNo(dto.getSrNo());
        entity.setPoNo(dto.getPoNo());
        entity.setPoRevisionNo(dto.getPoRevisionNo());
        entity.setPoDt(dto.getPoDt());
        entity.setPoStatus(dto.getPoStatus());
        entity.setPoType(dto.getPoType());
        entity.setContractType(dto.getContractType());
        entity.setContractStartDt(dto.getContractStartDt());
        entity.setContractEndDt(dto.getContractEndDt());
        entity.setCompletionFlg(dto.getCompletionFlg());
        entity.setBusinessPartnerId(dto.getBusinessPartnerId());
        entity.setBusinessPartnerName(dto.getBusinessPartnerName());
        entity.setBusinessPartnerSiteId(dto.getBusinessPartnerSiteId());
        entity.setBusinessPartnerSiteName(dto.getBusinessPartnerSiteName());
        entity.setBillInfoId(dto.getBillInfoId());
        entity.setBillInfoName(dto.getBillInfoName());
        entity.setBillAddress1(dto.getBillAddress1());
        entity.setBillCity(dto.getBillCity());
        entity.setBillState(dto.getBillState());
        entity.setBillCountry(dto.getBillCountry());
        entity.setBillZipCode(dto.getBillZipCode());
        entity.setShipInfoId(dto.getShipInfoId());
        entity.setShipInfoName(dto.getShipInfoName());
        entity.setShipAddress1(dto.getShipAddress1());
        entity.setShipCity(dto.getShipCity());
        entity.setShipState(dto.getShipState());
        entity.setShipCountry(dto.getShipCountry());
        entity.setShipZipCode(dto.getShipZipCode());
        entity.setContactPerson(dto.getContactPerson());
        entity.setShipTermsCd(dto.getShipTermsCd());
        entity.setShipModeCd(dto.getShipModeCd());
        entity.setPayTermsCd(dto.getPayTermsCd());
        entity.setPayTermDays(dto.getPayTermDays());
        entity.setCurCd(dto.getCurCd());
        entity.setExchRate(dto.getExchRate());
        entity.setTransporterName(dto.getTransporterName());
        entity.setTransporterAddress(dto.getTransporterAddress());
        entity.setPoReqDt(dto.getPoReqDt());
        entity.setTotalAmt(dto.getTotalAmt());
        entity.setLocalCurCd(dto.getLocalCurCd());
        entity.setLocalBasicAmt(dto.getLocalBasicAmt());
        entity.setCustomerId(dto.getCustomerId());
        entity.setCustomerName(dto.getCustomerName());
        entity.setNetTaxAmt(dto.getNetTaxAmt());
        entity.setBasicAmt(dto.getBasicAmt());
        entity.setFreightCharges(dto.getFreightCharges());
        entity.setHandlingCharges(dto.getHandlingCharges());
        entity.setOtherCharges(dto.getOtherCharges());
        entity.setLocFreightCharges(dto.getLocFreightCharges());
        entity.setLocHandlingCharges(dto.getLocHandlingCharges());
        entity.setLocOtherCharges(dto.getLocOtherCharges());
        entity.setGrandTotal(dto.getGrandTotal());
        entity.setLocalGrandTotal(dto.getLocalGrandTotal());
        entity.setTotalPoQty(dto.getTotalPoQty());
        entity.setTermsConditions(dto.getTermsConditions());
        entity.setCancelReason(dto.getCancelReason());
        entity.setRejectReason(dto.getRejectReason());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setRemarks(dto.getRemarks());
        entity.setBillToContactPerson(dto.getBillToContactPerson());
        entity.setBillToContactPersonNo(dto.getBillToContactPersonNo());
        entity.setShipToContactPerson(dto.getShipToContactPerson());
        entity.setShipToContactPersonNo(dto.getShipToContactPersonNo());
        entity.setWorkFlowProcessStatusId(dto.getWorkFlowProcessStatusId());
        entity.setBillToContactPerson1(dto.getBillToContactPerson1());
        entity.setBillToContactPersonNo1(dto.getBillToContactPersonNo1());
        entity.setShipToContactPerson1(dto.getShipToContactPerson1());
        entity.setShipToContactPersonNo1(dto.getShipToContactPersonNo1());
        entity.setIsFromCmms(dto.getIsFromCmms());
        entity.setAdvanceAmtRequired(dto.getAdvanceAmtRequired());
        entity.setAdvanceAmtValue(dto.getAdvanceAmtValue());
        entity.setOsprTermsAndConditions(dto.getOsprTermsAndConditions());
        entity.setGstNumber(dto.getGstNumber());
        entity.setExpectedArrivalDate(dto.getExpectedArrivalDate());
        entity.setSuppilerContactPersonName(dto.getSuppilerContactPersonName());
        entity.setSupplierContactNumber(dto.getSupplierContactNumber());
        entity.setSmApprovedLoginId(dto.getSmApprovedLoginId());
        entity.setSmApprovedDate(dto.getSmApprovedDate());
        entity.setVpApprovedLoginId(dto.getVpApprovedLoginId());
        entity.setVpApprovedDate(dto.getVpApprovedDate());
        entity.setAdvancePaymentPercentage(dto.getAdvancePaymentPercentage());
        return entity;
    }

    private PoHDTO mapToDTO(PoH entity) {
        PoHDTO dto = new PoHDTO();
        dto.setPoId(entity.getPoId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setSrNo(entity.getSrNo());
        dto.setPoNo(entity.getPoNo());
        dto.setPoRevisionNo(entity.getPoRevisionNo());
        dto.setPoDt(entity.getPoDt());
        dto.setPoStatus(entity.getPoStatus());
        dto.setPoType(entity.getPoType());
        dto.setContractType(entity.getContractType());
        dto.setContractStartDt(entity.getContractStartDt());
        dto.setContractEndDt(entity.getContractEndDt());
        dto.setCompletionFlg(entity.getCompletionFlg());
        dto.setBusinessPartnerId(entity.getBusinessPartnerId());
        dto.setBusinessPartnerName(entity.getBusinessPartnerName());
        dto.setBusinessPartnerSiteId(entity.getBusinessPartnerSiteId());
        dto.setBusinessPartnerSiteName(entity.getBusinessPartnerSiteName());
        dto.setBillInfoId(entity.getBillInfoId());
        dto.setBillInfoName(entity.getBillInfoName());
        dto.setBillAddress1(entity.getBillAddress1());
        dto.setBillCity(entity.getBillCity());
        dto.setBillState(entity.getBillState());
        dto.setBillCountry(entity.getBillCountry());
        dto.setBillZipCode(entity.getBillZipCode());
        dto.setShipInfoId(entity.getShipInfoId());
        dto.setShipInfoName(entity.getShipInfoName());
        dto.setShipAddress1(entity.getShipAddress1());
        dto.setShipCity(entity.getShipCity());
        dto.setShipState(entity.getShipState());
        dto.setShipCountry(entity.getShipCountry());
        dto.setShipZipCode(entity.getShipZipCode());
        dto.setContactPerson(entity.getContactPerson());
        dto.setShipTermsCd(entity.getShipTermsCd());
        dto.setShipModeCd(entity.getShipModeCd());
        dto.setPayTermsCd(entity.getPayTermsCd());
        dto.setPayTermDays(entity.getPayTermDays());
        dto.setCurCd(entity.getCurCd());
        dto.setExchRate(entity.getExchRate());
        dto.setTransporterName(entity.getTransporterName());
        dto.setTransporterAddress(entity.getTransporterAddress());
        dto.setPoReqDt(entity.getPoReqDt());
        dto.setTotalAmt(entity.getTotalAmt());
        dto.setLocalCurCd(entity.getLocalCurCd());
        dto.setLocalBasicAmt(entity.getLocalBasicAmt());
        dto.setCustomerId(entity.getCustomerId());
        dto.setCustomerName(entity.getCustomerName());
        dto.setNetTaxAmt(entity.getNetTaxAmt());
        dto.setBasicAmt(entity.getBasicAmt());
        dto.setFreightCharges(entity.getFreightCharges());
        dto.setHandlingCharges(entity.getHandlingCharges());
        dto.setOtherCharges(entity.getOtherCharges());
        dto.setLocFreightCharges(entity.getLocFreightCharges());
        dto.setLocHandlingCharges(entity.getLocHandlingCharges());
        dto.setLocOtherCharges(entity.getLocOtherCharges());
        dto.setGrandTotal(entity.getGrandTotal());
        dto.setLocalGrandTotal(entity.getLocalGrandTotal());
        dto.setTotalPoQty(entity.getTotalPoQty());
        dto.setTermsConditions(entity.getTermsConditions());
        dto.setCancelReason(entity.getCancelReason());
        dto.setRejectReason(entity.getRejectReason());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setRemarks(entity.getRemarks());
        dto.setBillToContactPerson(entity.getBillToContactPerson());
        dto.setBillToContactPersonNo(entity.getBillToContactPersonNo());
        dto.setShipToContactPerson(entity.getShipToContactPerson());
        dto.setShipToContactPersonNo(entity.getShipToContactPersonNo());
        dto.setWorkFlowProcessStatusId(entity.getWorkFlowProcessStatusId());
        dto.setBillToContactPerson1(entity.getBillToContactPerson1());
        dto.setBillToContactPersonNo1(entity.getBillToContactPersonNo1());
        dto.setShipToContactPerson1(entity.getShipToContactPerson1());
        dto.setShipToContactPersonNo1(entity.getShipToContactPersonNo1());
        dto.setIsFromCmms(entity.getIsFromCmms());
        dto.setAdvanceAmtRequired(entity.getAdvanceAmtRequired());
        dto.setAdvanceAmtValue(entity.getAdvanceAmtValue());
        dto.setOsprTermsAndConditions(entity.getOsprTermsAndConditions());
        dto.setGstNumber(entity.getGstNumber());
        dto.setExpectedArrivalDate(entity.getExpectedArrivalDate());
        dto.setSuppilerContactPersonName(entity.getSuppilerContactPersonName());
        dto.setSupplierContactNumber(entity.getSupplierContactNumber());
        dto.setSmApprovedLoginId(entity.getSmApprovedLoginId());
        dto.setSmApprovedDate(entity.getSmApprovedDate());
        dto.setVpApprovedLoginId(entity.getVpApprovedLoginId());
        dto.setVpApprovedDate(entity.getVpApprovedDate());
        dto.setAdvancePaymentPercentage(entity.getAdvancePaymentPercentage());
        return dto;
    }
}