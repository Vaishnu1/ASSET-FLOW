package com.sams.service.impl;

import com.sams.dto.SrCheckPointsDTO;
import com.sams.entity.SrCheckPoints;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrCheckPointsRepository;
import com.sams.service.SrCheckPointsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrCheckPointsServiceImpl implements SrCheckPointsService {

    private final SrCheckPointsRepository repository;

    @Override
    @Transactional
    public SrCheckPointsDTO create(SrCheckPointsDTO dto) {
        SrCheckPoints entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrCheckPointsDTO getById(Long id) {
        SrCheckPoints entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrCheckPoints not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrCheckPointsDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrCheckPointsDTO update(Long id, SrCheckPointsDTO dto) {
        SrCheckPoints entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrCheckPoints not found with ID: " + id));
        SrCheckPoints mapped = mapToEntity(dto);
        mapped.setCheckPointsId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrCheckPoints entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrCheckPoints not found with ID: " + id));
        repository.delete(entity);
    }

    private SrCheckPoints mapToEntity(SrCheckPointsDTO dto) {
        SrCheckPoints entity = new SrCheckPoints();
        entity.setCheckPointsId(dto.getCheckPointsId());
        entity.setSrId(dto.getSrId());
        entity.setModelId(dto.getModelId());
        entity.setModelCheckPtsId(dto.getModelCheckPtsId());
        entity.setParameterName(dto.getParameterName());
        entity.setParameterType(dto.getParameterType());
        entity.setStartValue(dto.getStartValue());
        entity.setEndValue(dto.getEndValue());
        entity.setUom(dto.getUom());
        entity.setActualValue(dto.getActualValue());
        entity.setResult(dto.getResult());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setParameterId(dto.getParameterId());
        entity.setParameterTypeId(dto.getParameterTypeId());
        entity.setParameterGroupId(dto.getParameterGroupId());
        entity.setParameterGroupName(dto.getParameterGroupName());
        entity.setDefaultValue(dto.getDefaultValue());
        entity.setMinAllowedValue(dto.getMinAllowedValue());
        entity.setMaxAllowedValue(dto.getMaxAllowedValue());
        entity.setInputType(dto.getInputType());
        entity.setAssetId(dto.getAssetId());
        entity.setAssetCheckPtsId(dto.getAssetCheckPtsId());
        return entity;
    }

    private SrCheckPointsDTO mapToDTO(SrCheckPoints entity) {
        SrCheckPointsDTO dto = new SrCheckPointsDTO();
        dto.setCheckPointsId(entity.getCheckPointsId());
        dto.setSrId(entity.getSrId());
        dto.setModelId(entity.getModelId());
        dto.setModelCheckPtsId(entity.getModelCheckPtsId());
        dto.setParameterName(entity.getParameterName());
        dto.setParameterType(entity.getParameterType());
        dto.setStartValue(entity.getStartValue());
        dto.setEndValue(entity.getEndValue());
        dto.setUom(entity.getUom());
        dto.setActualValue(entity.getActualValue());
        dto.setResult(entity.getResult());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setParameterId(entity.getParameterId());
        dto.setParameterTypeId(entity.getParameterTypeId());
        dto.setParameterGroupId(entity.getParameterGroupId());
        dto.setParameterGroupName(entity.getParameterGroupName());
        dto.setDefaultValue(entity.getDefaultValue());
        dto.setMinAllowedValue(entity.getMinAllowedValue());
        dto.setMaxAllowedValue(entity.getMaxAllowedValue());
        dto.setInputType(entity.getInputType());
        dto.setAssetId(entity.getAssetId());
        dto.setAssetCheckPtsId(entity.getAssetCheckPtsId());
        return dto;
    }
}