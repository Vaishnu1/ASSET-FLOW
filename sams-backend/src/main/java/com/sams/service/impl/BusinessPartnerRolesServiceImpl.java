package com.sams.service.impl;

import com.sams.dto.BusinessPartnerRolesDTO;
import com.sams.entity.BusinessPartnerRoles;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.BusinessPartnerRolesRepository;
import com.sams.service.BusinessPartnerRolesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BusinessPartnerRolesServiceImpl implements BusinessPartnerRolesService {

    private final BusinessPartnerRolesRepository repository;

    @Override
    @Transactional
    public BusinessPartnerRolesDTO create(BusinessPartnerRolesDTO dto) {
        BusinessPartnerRoles entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public BusinessPartnerRolesDTO getById(Long id) {
        BusinessPartnerRoles entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BusinessPartnerRoles not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<BusinessPartnerRolesDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BusinessPartnerRolesDTO update(Long id, BusinessPartnerRolesDTO dto) {
        BusinessPartnerRoles entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BusinessPartnerRoles not found with ID: " + id));
        BusinessPartnerRoles mapped = mapToEntity(dto);
        mapped.setBusinessPartnerRoleId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        BusinessPartnerRoles entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BusinessPartnerRoles not found with ID: " + id));
        repository.delete(entity);
    }

    private BusinessPartnerRoles mapToEntity(BusinessPartnerRolesDTO dto) {
        BusinessPartnerRoles entity = new BusinessPartnerRoles();
        entity.setBusinessPartnerRoleId(dto.getBusinessPartnerRoleId());
        entity.setBusinessPartnerRoleName(dto.getBusinessPartnerRoleName());
        entity.setRemarks(dto.getRemarks());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private BusinessPartnerRolesDTO mapToDTO(BusinessPartnerRoles entity) {
        BusinessPartnerRolesDTO dto = new BusinessPartnerRolesDTO();
        dto.setBusinessPartnerRoleId(entity.getBusinessPartnerRoleId());
        dto.setBusinessPartnerRoleName(entity.getBusinessPartnerRoleName());
        dto.setRemarks(entity.getRemarks());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}