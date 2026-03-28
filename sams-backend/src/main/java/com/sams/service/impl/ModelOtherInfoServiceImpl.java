package com.sams.service.impl;

import com.sams.dto.ModelOtherInfoDTO;
import com.sams.entity.ModelOtherInfo;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ModelOtherInfoRepository;
import com.sams.service.ModelOtherInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModelOtherInfoServiceImpl implements ModelOtherInfoService {

    private final ModelOtherInfoRepository repository;

    @Override
    @Transactional
    public ModelOtherInfoDTO create(ModelOtherInfoDTO dto) {
        ModelOtherInfo entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ModelOtherInfoDTO getById(Long id) {
        ModelOtherInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelOtherInfo not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ModelOtherInfoDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ModelOtherInfoDTO update(Long id, ModelOtherInfoDTO dto) {
        ModelOtherInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelOtherInfo not found with ID: " + id));
        ModelOtherInfo mapped = mapToEntity(dto);
        mapped.setModelOtherInfoId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ModelOtherInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelOtherInfo not found with ID: " + id));
        repository.delete(entity);
    }

    private ModelOtherInfo mapToEntity(ModelOtherInfoDTO dto) {
        ModelOtherInfo entity = new ModelOtherInfo();
        entity.setModelOtherInfoId(dto.getModelOtherInfoId());
        entity.setOrgId(dto.getOrgId());
        entity.setModelId(dto.getModelId());
        entity.setInfoName(dto.getInfoName());
        entity.setInfoLabel(dto.getInfoLabel());
        entity.setInfoTitle(dto.getInfoTitle());
        entity.setInfoType(dto.getInfoType());
        entity.setInfoDetails(dto.getInfoDetails());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ModelOtherInfoDTO mapToDTO(ModelOtherInfo entity) {
        ModelOtherInfoDTO dto = new ModelOtherInfoDTO();
        dto.setModelOtherInfoId(entity.getModelOtherInfoId());
        dto.setOrgId(entity.getOrgId());
        dto.setModelId(entity.getModelId());
        dto.setInfoName(entity.getInfoName());
        dto.setInfoLabel(entity.getInfoLabel());
        dto.setInfoTitle(entity.getInfoTitle());
        dto.setInfoType(entity.getInfoType());
        dto.setInfoDetails(entity.getInfoDetails());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}