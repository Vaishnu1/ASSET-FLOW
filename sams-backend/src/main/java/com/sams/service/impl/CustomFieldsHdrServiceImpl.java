package com.sams.service.impl;

import com.sams.dto.CustomFieldsHdrDTO;
import com.sams.entity.CustomFieldsHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.CustomFieldsHdrRepository;
import com.sams.service.CustomFieldsHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomFieldsHdrServiceImpl implements CustomFieldsHdrService {

    private final CustomFieldsHdrRepository repository;

    @Override
    @Transactional
    public CustomFieldsHdrDTO create(CustomFieldsHdrDTO dto) {
        CustomFieldsHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public CustomFieldsHdrDTO getById(Long id) {
        CustomFieldsHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustomFieldsHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<CustomFieldsHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CustomFieldsHdrDTO update(Long id, CustomFieldsHdrDTO dto) {
        CustomFieldsHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustomFieldsHdr not found with ID: " + id));
        CustomFieldsHdr mapped = mapToEntity(dto);
        mapped.setCustomFieldsHdrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        CustomFieldsHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustomFieldsHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private CustomFieldsHdr mapToEntity(CustomFieldsHdrDTO dto) {
        CustomFieldsHdr entity = new CustomFieldsHdr();
        entity.setCustomFieldsHdrId(dto.getCustomFieldsHdrId());
        entity.setOrgId(dto.getOrgId());
        entity.setAssetSubCategoryId(dto.getAssetSubCategoryId());
        entity.setAttributeName(dto.getAttributeName());
        entity.setInputType(dto.getInputType());
        entity.setInputMaxLength(dto.getInputMaxLength());
        entity.setBasedOn(dto.getBasedOn());
        entity.setDisplayGroup(dto.getDisplayGroup());
        entity.setDisplayGroupId(dto.getDisplayGroupId());
        entity.setColor(dto.getColor());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private CustomFieldsHdrDTO mapToDTO(CustomFieldsHdr entity) {
        CustomFieldsHdrDTO dto = new CustomFieldsHdrDTO();
        dto.setCustomFieldsHdrId(entity.getCustomFieldsHdrId());
        dto.setOrgId(entity.getOrgId());
        dto.setAssetSubCategoryId(entity.getAssetSubCategoryId());
        dto.setAttributeName(entity.getAttributeName());
        dto.setInputType(entity.getInputType());
        dto.setInputMaxLength(entity.getInputMaxLength());
        dto.setBasedOn(entity.getBasedOn());
        dto.setDisplayGroup(entity.getDisplayGroup());
        dto.setDisplayGroupId(entity.getDisplayGroupId());
        dto.setColor(entity.getColor());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}