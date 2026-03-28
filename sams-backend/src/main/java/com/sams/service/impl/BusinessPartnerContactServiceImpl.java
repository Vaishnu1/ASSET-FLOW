package com.sams.service.impl;

import com.sams.dto.BusinessPartnerContactDTO;
import com.sams.entity.BusinessPartnerContact;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.BusinessPartnerContactRepository;
import com.sams.service.BusinessPartnerContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BusinessPartnerContactServiceImpl implements BusinessPartnerContactService {

    private final BusinessPartnerContactRepository repository;

    @Override
    @Transactional
    public BusinessPartnerContactDTO create(BusinessPartnerContactDTO dto) {
        BusinessPartnerContact entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public BusinessPartnerContactDTO getById(Long id) {
        BusinessPartnerContact entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BusinessPartnerContact not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<BusinessPartnerContactDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BusinessPartnerContactDTO update(Long id, BusinessPartnerContactDTO dto) {
        BusinessPartnerContact entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BusinessPartnerContact not found with ID: " + id));
        BusinessPartnerContact mapped = mapToEntity(dto);
        mapped.setBusinessPartnerContId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        BusinessPartnerContact entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BusinessPartnerContact not found with ID: " + id));
        repository.delete(entity);
    }

    private BusinessPartnerContact mapToEntity(BusinessPartnerContactDTO dto) {
        BusinessPartnerContact entity = new BusinessPartnerContact();
        entity.setBusinessPartnerContId(dto.getBusinessPartnerContId());
        entity.setBusinessPartnerSiteId(dto.getBusinessPartnerSiteId());
        entity.setBusinessPartnerId(dto.getBusinessPartnerId());
        entity.setContactPersonName(dto.getContactPersonName());
        entity.setContactPersonPhoneNo(dto.getContactPersonPhoneNo());
        entity.setContactPersonEmailId(dto.getContactPersonEmailId());
        entity.setContactPersonDesignation(dto.getContactPersonDesignation());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private BusinessPartnerContactDTO mapToDTO(BusinessPartnerContact entity) {
        BusinessPartnerContactDTO dto = new BusinessPartnerContactDTO();
        dto.setBusinessPartnerContId(entity.getBusinessPartnerContId());
        dto.setBusinessPartnerSiteId(entity.getBusinessPartnerSiteId());
        dto.setBusinessPartnerId(entity.getBusinessPartnerId());
        dto.setContactPersonName(entity.getContactPersonName());
        dto.setContactPersonPhoneNo(entity.getContactPersonPhoneNo());
        dto.setContactPersonEmailId(entity.getContactPersonEmailId());
        dto.setContactPersonDesignation(entity.getContactPersonDesignation());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}