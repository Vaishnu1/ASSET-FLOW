package com.sams.service.impl;

import com.sams.dto.LocAssetCodeGenerationDTO;
import com.sams.entity.LocAssetCodeGeneration;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.LocAssetCodeGenerationRepository;
import com.sams.service.LocAssetCodeGenerationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocAssetCodeGenerationServiceImpl implements LocAssetCodeGenerationService {

    private final LocAssetCodeGenerationRepository repository;

    @Override
    @Transactional
    public LocAssetCodeGenerationDTO create(LocAssetCodeGenerationDTO dto) {
        LocAssetCodeGeneration entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public LocAssetCodeGenerationDTO getById(Long id) {
        LocAssetCodeGeneration entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocAssetCodeGeneration not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<LocAssetCodeGenerationDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LocAssetCodeGenerationDTO update(Long id, LocAssetCodeGenerationDTO dto) {
        LocAssetCodeGeneration entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocAssetCodeGeneration not found with ID: " + id));
        LocAssetCodeGeneration mapped = mapToEntity(dto);
        mapped.setLocAssetCodeGenerationId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        LocAssetCodeGeneration entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocAssetCodeGeneration not found with ID: " + id));
        repository.delete(entity);
    }

    private LocAssetCodeGeneration mapToEntity(LocAssetCodeGenerationDTO dto) {
        LocAssetCodeGeneration entity = new LocAssetCodeGeneration();
        entity.setLocAssetCodeGenerationId(dto.getLocAssetCodeGenerationId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setSubCategoryId(dto.getSubCategoryId());
        entity.setSubCategoryName(dto.getSubCategoryName());
        entity.setPrefix(dto.getPrefix());
        entity.setVariable1(dto.getVariable1());
        entity.setVariable2(dto.getVariable2());
        entity.setVariable3(dto.getVariable3());
        entity.setSeparator(dto.getSeparator());
        entity.setAutoGenerate(dto.getAutoGenerate());
        entity.setSequenceName(dto.getSequenceName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private LocAssetCodeGenerationDTO mapToDTO(LocAssetCodeGeneration entity) {
        LocAssetCodeGenerationDTO dto = new LocAssetCodeGenerationDTO();
        dto.setLocAssetCodeGenerationId(entity.getLocAssetCodeGenerationId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setSubCategoryId(entity.getSubCategoryId());
        dto.setSubCategoryName(entity.getSubCategoryName());
        dto.setPrefix(entity.getPrefix());
        dto.setVariable1(entity.getVariable1());
        dto.setVariable2(entity.getVariable2());
        dto.setVariable3(entity.getVariable3());
        dto.setSeparator(entity.getSeparator());
        dto.setAutoGenerate(entity.getAutoGenerate());
        dto.setSequenceName(entity.getSequenceName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}