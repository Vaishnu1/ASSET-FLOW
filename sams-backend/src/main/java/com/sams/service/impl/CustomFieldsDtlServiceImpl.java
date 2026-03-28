package com.sams.service.impl;

import com.sams.dto.CustomFieldsDtlDTO;
import com.sams.entity.CustomFieldsDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.CustomFieldsDtlRepository;
import com.sams.service.CustomFieldsDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomFieldsDtlServiceImpl implements CustomFieldsDtlService {

    private final CustomFieldsDtlRepository repository;

    @Override
    @Transactional
    public CustomFieldsDtlDTO create(CustomFieldsDtlDTO dto) {
        CustomFieldsDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public CustomFieldsDtlDTO getById(Long id) {
        CustomFieldsDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustomFieldsDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<CustomFieldsDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CustomFieldsDtlDTO update(Long id, CustomFieldsDtlDTO dto) {
        CustomFieldsDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustomFieldsDtl not found with ID: " + id));
        CustomFieldsDtl mapped = mapToEntity(dto);
        mapped.setCustomFieldsDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        CustomFieldsDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustomFieldsDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private CustomFieldsDtl mapToEntity(CustomFieldsDtlDTO dto) {
        CustomFieldsDtl entity = new CustomFieldsDtl();
        entity.setCustomFieldsDtlId(dto.getCustomFieldsDtlId());
        entity.setCustomFieldsHdrId(dto.getCustomFieldsHdrId());
        entity.setCustomFieldsValues(dto.getCustomFieldsValues());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private CustomFieldsDtlDTO mapToDTO(CustomFieldsDtl entity) {
        CustomFieldsDtlDTO dto = new CustomFieldsDtlDTO();
        dto.setCustomFieldsDtlId(entity.getCustomFieldsDtlId());
        dto.setCustomFieldsHdrId(entity.getCustomFieldsHdrId());
        dto.setCustomFieldsValues(entity.getCustomFieldsValues());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}