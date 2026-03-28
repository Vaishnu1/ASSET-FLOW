package com.sams.service.impl;

import com.sams.dto.BusinessPartnerRegDTO;
import com.sams.entity.BusinessPartnerReg;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.BusinessPartnerRegRepository;
import com.sams.service.BusinessPartnerRegService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BusinessPartnerRegServiceImpl implements BusinessPartnerRegService {

    private final BusinessPartnerRegRepository repository;

    @Override
    @Transactional
    public BusinessPartnerRegDTO create(BusinessPartnerRegDTO dto) {
        BusinessPartnerReg entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public BusinessPartnerRegDTO getById(Long id) {
        BusinessPartnerReg entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BusinessPartnerReg not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<BusinessPartnerRegDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BusinessPartnerRegDTO update(Long id, BusinessPartnerRegDTO dto) {
        BusinessPartnerReg entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BusinessPartnerReg not found with ID: " + id));
        BusinessPartnerReg mapped = mapToEntity(dto);
        mapped.setBusinessPartnerRegId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        BusinessPartnerReg entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BusinessPartnerReg not found with ID: " + id));
        repository.delete(entity);
    }

    private BusinessPartnerReg mapToEntity(BusinessPartnerRegDTO dto) {
        BusinessPartnerReg entity = new BusinessPartnerReg();
        entity.setBusinessPartnerRegId(dto.getBusinessPartnerRegId());
        entity.setBusinessPartnerSiteId(dto.getBusinessPartnerSiteId());
        entity.setBusinessPartnerId(dto.getBusinessPartnerId());
        entity.setRegistrationName(dto.getRegistrationName());
        entity.setRegistrationNo(dto.getRegistrationNo());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private BusinessPartnerRegDTO mapToDTO(BusinessPartnerReg entity) {
        BusinessPartnerRegDTO dto = new BusinessPartnerRegDTO();
        dto.setBusinessPartnerRegId(entity.getBusinessPartnerRegId());
        dto.setBusinessPartnerSiteId(entity.getBusinessPartnerSiteId());
        dto.setBusinessPartnerId(entity.getBusinessPartnerId());
        dto.setRegistrationName(entity.getRegistrationName());
        dto.setRegistrationNo(entity.getRegistrationNo());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}