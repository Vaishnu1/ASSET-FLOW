package com.sams.service.impl;

import com.sams.dto.BusinessPartnerDTO;
import com.sams.entity.BusinessPartner;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.BusinessPartnerRepository;
import com.sams.service.BusinessPartnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BusinessPartnerServiceImpl implements BusinessPartnerService {

    private final BusinessPartnerRepository repository;

    @Override
    @Transactional
    public BusinessPartnerDTO createBusinessPartner(BusinessPartnerDTO dto) {
        BusinessPartner entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public BusinessPartnerDTO getBusinessPartnerById(Long id) {
        BusinessPartner entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BusinessPartner not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<BusinessPartnerDTO> getAllBusinessPartners() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BusinessPartnerDTO updateBusinessPartner(Long id, BusinessPartnerDTO dto) {
        BusinessPartner entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BusinessPartner not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        BusinessPartner mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteBusinessPartner(Long id) {
        BusinessPartner entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BusinessPartner not found with ID: " + id));
        repository.delete(entity);
    }

    private BusinessPartner mapToEntity(BusinessPartnerDTO dto) {
        BusinessPartner entity = new BusinessPartner();
        entity.setOrgId(dto.getOrgId());
        entity.setOrgName(dto.getOrgName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setBusinessPartnerId(dto.getBusinessPartnerId());
        entity.setBusinessPartnerName(dto.getBusinessPartnerName());
        entity.setPartnerSiteId(dto.getPartnerSiteId());
        entity.setPartnerSiteName(dto.getPartnerSiteName());
        entity.setPartnerSiteCountry(dto.getPartnerSiteCountry());
        entity.setPartnerSiteCountryId(dto.getPartnerSiteCountryId());
        entity.setPartnerSiteStateId(dto.getPartnerSiteStateId());
        entity.setPartnerSiteState(dto.getPartnerSiteState());
        entity.setPartnerSiteCity(dto.getPartnerSiteCity());
        entity.setPartnerSiteArea(dto.getPartnerSiteArea());
        entity.setActiveFromDtDisp(dto.getActiveFromDtDisp());
        entity.setActiveTillDtDisp(dto.getActiveTillDtDisp());
        entity.setSelectedRolesList(dto.getSelectedRolesList());
        entity.setBusinessPartnerRoleId(dto.getBusinessPartnerRoleId());
        entity.setBusinessPartnerRoleName(dto.getBusinessPartnerRoleName());
        return entity;
    }

    private BusinessPartnerDTO mapToDTO(BusinessPartner entity) {
        BusinessPartnerDTO dto = new BusinessPartnerDTO();
        dto.setId(entity.getId());
        dto.setOrgId(entity.getOrgId());
        dto.setOrgName(entity.getOrgName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setBusinessPartnerId(entity.getBusinessPartnerId());
        dto.setBusinessPartnerName(entity.getBusinessPartnerName());
        dto.setPartnerSiteId(entity.getPartnerSiteId());
        dto.setPartnerSiteName(entity.getPartnerSiteName());
        dto.setPartnerSiteCountry(entity.getPartnerSiteCountry());
        dto.setPartnerSiteCountryId(entity.getPartnerSiteCountryId());
        dto.setPartnerSiteStateId(entity.getPartnerSiteStateId());
        dto.setPartnerSiteState(entity.getPartnerSiteState());
        dto.setPartnerSiteCity(entity.getPartnerSiteCity());
        dto.setPartnerSiteArea(entity.getPartnerSiteArea());
        dto.setActiveFromDtDisp(entity.getActiveFromDtDisp());
        dto.setActiveTillDtDisp(entity.getActiveTillDtDisp());
        dto.setSelectedRolesList(entity.getSelectedRolesList());
        dto.setBusinessPartnerRoleId(entity.getBusinessPartnerRoleId());
        dto.setBusinessPartnerRoleName(entity.getBusinessPartnerRoleName());
        return dto;
    }
}