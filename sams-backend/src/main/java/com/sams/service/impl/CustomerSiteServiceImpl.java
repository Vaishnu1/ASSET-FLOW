package com.sams.service.impl;

import com.sams.dto.CustomerSiteDTO;
import com.sams.entity.CustomerSite;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.CustomerSiteRepository;
import com.sams.service.CustomerSiteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerSiteServiceImpl implements CustomerSiteService {

    private final CustomerSiteRepository repository;

    @Override
    @Transactional
    public CustomerSiteDTO createCustomerSite(CustomerSiteDTO dto) {
        CustomerSite entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public CustomerSiteDTO getCustomerSiteById(Long id) {
        CustomerSite entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustomerSite not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<CustomerSiteDTO> getAllCustomerSites() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CustomerSiteDTO updateCustomerSite(Long id, CustomerSiteDTO dto) {
        CustomerSite entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustomerSite not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        CustomerSite mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteCustomerSite(Long id) {
        CustomerSite entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustomerSite not found with ID: " + id));
        repository.delete(entity);
    }

    private CustomerSite mapToEntity(CustomerSiteDTO dto) {
        CustomerSite entity = new CustomerSite();
        entity.setCustomerId(dto.getCustomerId());
        entity.setCustomerSiteId(dto.getCustomerSiteId());
        entity.setCustomerSiteName(dto.getCustomerSiteName());
        entity.setCustomerName(dto.getCustomerName());
        entity.setCustContactPerson(dto.getCustContactPerson());
        entity.setAddress1(dto.getAddress1());
        entity.setAddress2(dto.getAddress2());
        entity.setCity(dto.getCity());
        entity.setState(dto.getState());
        entity.setCountry(dto.getCountry());
        entity.setPostalCd(dto.getPostalCd());
        entity.setContactNo1(dto.getContactNo1());
        entity.setContactNo2(dto.getContactNo2());
        entity.setContactNo3(dto.getContactNo3());
        entity.setCustEmailId(dto.getCustEmailId());
        entity.setCustCurCd(dto.getCustCurCd());
        entity.setCustShipTermsCd(dto.getCustShipTermsCd());
        entity.setCustShipModeCd(dto.getCustShipModeCd());
        entity.setCustTransporterName(dto.getCustTransporterName());
        entity.setCustPayTermsCd(dto.getCustPayTermsCd());
        entity.setCustPayTermDays(dto.getCustPayTermDays());
        entity.setCustGlAccCd(dto.getCustGlAccCd());
        entity.setCustBankName(dto.getCustBankName());
        entity.setCustBankBranchName(dto.getCustBankBranchName());
        entity.setCustBankAccNo(dto.getCustBankAccNo());
        entity.setCustBankAddress1(dto.getCustBankAddress1());
        entity.setCustBankAddress2(dto.getCustBankAddress2());
        entity.setCustBankCity(dto.getCustBankCity());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        return entity;
    }

    private CustomerSiteDTO mapToDTO(CustomerSite entity) {
        CustomerSiteDTO dto = new CustomerSiteDTO();
        dto.setId(entity.getId());
        dto.setCustomerId(entity.getCustomerId());
        dto.setCustomerSiteId(entity.getCustomerSiteId());
        dto.setCustomerSiteName(entity.getCustomerSiteName());
        dto.setCustomerName(entity.getCustomerName());
        dto.setCustContactPerson(entity.getCustContactPerson());
        dto.setAddress1(entity.getAddress1());
        dto.setAddress2(entity.getAddress2());
        dto.setCity(entity.getCity());
        dto.setState(entity.getState());
        dto.setCountry(entity.getCountry());
        dto.setPostalCd(entity.getPostalCd());
        dto.setContactNo1(entity.getContactNo1());
        dto.setContactNo2(entity.getContactNo2());
        dto.setContactNo3(entity.getContactNo3());
        dto.setCustEmailId(entity.getCustEmailId());
        dto.setCustCurCd(entity.getCustCurCd());
        dto.setCustShipTermsCd(entity.getCustShipTermsCd());
        dto.setCustShipModeCd(entity.getCustShipModeCd());
        dto.setCustTransporterName(entity.getCustTransporterName());
        dto.setCustPayTermsCd(entity.getCustPayTermsCd());
        dto.setCustPayTermDays(entity.getCustPayTermDays());
        dto.setCustGlAccCd(entity.getCustGlAccCd());
        dto.setCustBankName(entity.getCustBankName());
        dto.setCustBankBranchName(entity.getCustBankBranchName());
        dto.setCustBankAccNo(entity.getCustBankAccNo());
        dto.setCustBankAddress1(entity.getCustBankAddress1());
        dto.setCustBankAddress2(entity.getCustBankAddress2());
        dto.setCustBankCity(entity.getCustBankCity());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        return dto;
    }
}