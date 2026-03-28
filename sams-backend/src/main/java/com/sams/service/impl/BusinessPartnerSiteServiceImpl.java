package com.sams.service.impl;

import com.sams.dto.BusinessPartnerSiteDTO;
import com.sams.entity.BusinessPartnerSite;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.BusinessPartnerSiteRepository;
import com.sams.service.BusinessPartnerSiteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BusinessPartnerSiteServiceImpl implements BusinessPartnerSiteService {

    private final BusinessPartnerSiteRepository repository;

    @Override
    @Transactional
    public BusinessPartnerSiteDTO create(BusinessPartnerSiteDTO dto) {
        BusinessPartnerSite entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public BusinessPartnerSiteDTO getById(Long id) {
        BusinessPartnerSite entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BusinessPartnerSite not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<BusinessPartnerSiteDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BusinessPartnerSiteDTO update(Long id, BusinessPartnerSiteDTO dto) {
        BusinessPartnerSite entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BusinessPartnerSite not found with ID: " + id));
        BusinessPartnerSite mapped = mapToEntity(dto);
        mapped.setBusinessPartnerSiteId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        BusinessPartnerSite entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BusinessPartnerSite not found with ID: " + id));
        repository.delete(entity);
    }

    private BusinessPartnerSite mapToEntity(BusinessPartnerSiteDTO dto) {
        BusinessPartnerSite entity = new BusinessPartnerSite();
        entity.setBusinessPartnerSiteId(dto.getBusinessPartnerSiteId());
        entity.setBusinessPartnerId(dto.getBusinessPartnerId());
        entity.setPartnerSiteName(dto.getPartnerSiteName());
        entity.setContactPersonName(dto.getContactPersonName());
        entity.setContactPersonPhoneNo(dto.getContactPersonPhoneNo());
        entity.setContactPersonEmailId(dto.getContactPersonEmailId());
        entity.setAddress1(dto.getAddress1());
        entity.setAddress2(dto.getAddress2());
        entity.setArea(dto.getArea());
        entity.setCity(dto.getCity());
        entity.setState(dto.getState());
        entity.setCountry(dto.getCountry());
        entity.setPinCode(dto.getPinCode());
        entity.setCompanyMobileNumber(dto.getCompanyMobileNumber());
        entity.setCompanyLandLineNumber(dto.getCompanyLandLineNumber());
        entity.setCompanyEmailId(dto.getCompanyEmailId());
        entity.setCurCd(dto.getCurCd());
        entity.setPaymentTerms(dto.getPaymentTerms());
        entity.setPaymentMethod(dto.getPaymentMethod());
        entity.setWebsite(dto.getWebsite());
        entity.setServiceCenterSite(dto.getServiceCenterSite());
        entity.setSupplierSite(dto.getSupplierSite());
        entity.setManufacturerSite(dto.getManufacturerSite());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private BusinessPartnerSiteDTO mapToDTO(BusinessPartnerSite entity) {
        BusinessPartnerSiteDTO dto = new BusinessPartnerSiteDTO();
        dto.setBusinessPartnerSiteId(entity.getBusinessPartnerSiteId());
        dto.setBusinessPartnerId(entity.getBusinessPartnerId());
        dto.setPartnerSiteName(entity.getPartnerSiteName());
        dto.setContactPersonName(entity.getContactPersonName());
        dto.setContactPersonPhoneNo(entity.getContactPersonPhoneNo());
        dto.setContactPersonEmailId(entity.getContactPersonEmailId());
        dto.setAddress1(entity.getAddress1());
        dto.setAddress2(entity.getAddress2());
        dto.setArea(entity.getArea());
        dto.setCity(entity.getCity());
        dto.setState(entity.getState());
        dto.setCountry(entity.getCountry());
        dto.setPinCode(entity.getPinCode());
        dto.setCompanyMobileNumber(entity.getCompanyMobileNumber());
        dto.setCompanyLandLineNumber(entity.getCompanyLandLineNumber());
        dto.setCompanyEmailId(entity.getCompanyEmailId());
        dto.setCurCd(entity.getCurCd());
        dto.setPaymentTerms(entity.getPaymentTerms());
        dto.setPaymentMethod(entity.getPaymentMethod());
        dto.setWebsite(entity.getWebsite());
        dto.setServiceCenterSite(entity.getServiceCenterSite());
        dto.setSupplierSite(entity.getSupplierSite());
        dto.setManufacturerSite(entity.getManufacturerSite());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}