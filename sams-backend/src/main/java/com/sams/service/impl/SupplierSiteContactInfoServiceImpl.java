package com.sams.service.impl;

import com.sams.dto.SupplierSiteContactInfoDTO;
import com.sams.entity.SupplierSiteContactInfo;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SupplierSiteContactInfoRepository;
import com.sams.service.SupplierSiteContactInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierSiteContactInfoServiceImpl implements SupplierSiteContactInfoService {

    private final SupplierSiteContactInfoRepository repository;

    @Override
    @Transactional
    public SupplierSiteContactInfoDTO create(SupplierSiteContactInfoDTO dto) {
        SupplierSiteContactInfo entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SupplierSiteContactInfoDTO getById(Long id) {
        SupplierSiteContactInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierSiteContactInfo not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SupplierSiteContactInfoDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SupplierSiteContactInfoDTO update(Long id, SupplierSiteContactInfoDTO dto) {
        SupplierSiteContactInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierSiteContactInfo not found with ID: " + id));
        SupplierSiteContactInfo mapped = mapToEntity(dto);
        mapped.setSupplierSiteContactId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SupplierSiteContactInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierSiteContactInfo not found with ID: " + id));
        repository.delete(entity);
    }

    private SupplierSiteContactInfo mapToEntity(SupplierSiteContactInfoDTO dto) {
        SupplierSiteContactInfo entity = new SupplierSiteContactInfo();
        entity.setSupplierSiteContactId(dto.getSupplierSiteContactId());
        entity.setSupplierSiteId(dto.getSupplierSiteId());
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

    private SupplierSiteContactInfoDTO mapToDTO(SupplierSiteContactInfo entity) {
        SupplierSiteContactInfoDTO dto = new SupplierSiteContactInfoDTO();
        dto.setSupplierSiteContactId(entity.getSupplierSiteContactId());
        dto.setSupplierSiteId(entity.getSupplierSiteId());
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