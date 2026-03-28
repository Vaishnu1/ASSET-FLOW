package com.sams.service.impl;

import com.sams.dto.ModelDTO;
import com.sams.entity.Model;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ModelRepository;
import com.sams.service.ModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModelServiceImpl implements ModelService {

    private final ModelRepository repository;

    @Override
    @Transactional
    public ModelDTO create(ModelDTO dto) {
        Model entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ModelDTO getById(Long id) {
        Model entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Model not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ModelDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ModelDTO update(Long id, ModelDTO dto) {
        Model entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Model not found with ID: " + id));
        Model mapped = mapToEntity(dto);
        mapped.setModelId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Model entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Model not found with ID: " + id));
        repository.delete(entity);
    }

    private Model mapToEntity(ModelDTO dto) {
        Model entity = new Model();
        entity.setModelId(dto.getModelId());
        entity.setOrgId(dto.getOrgId());
        entity.setModelName(dto.getModelName());
        entity.setModelNo(dto.getModelNo());
        entity.setBusinessPartnerId(dto.getBusinessPartnerId());
        entity.setAssetCategoryId(dto.getAssetCategoryId());
        entity.setAssetTypeId(dto.getAssetTypeId());
        entity.setAssetSubCategoryId(dto.getAssetSubCategoryId());
        entity.setAssetGroupId(dto.getAssetGroupId());
        entity.setVolumeLicensePresent(dto.getVolumeLicensePresent());
        entity.setInstallationType(dto.getInstallationType());
        entity.setTrackIndividualLicenses(dto.getTrackIndividualLicenses());
        entity.setMaintenanceThresholdPercentage(dto.getMaintenanceThresholdPercentage());
        entity.setExpectedLifeInYears(dto.getExpectedLifeInYears());
        entity.setDepreciationMethodId(dto.getDepreciationMethodId());
        entity.setRateOfDepreciation(dto.getRateOfDepreciation());
        entity.setScrapValuePercentage(dto.getScrapValuePercentage());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ModelDTO mapToDTO(Model entity) {
        ModelDTO dto = new ModelDTO();
        dto.setModelId(entity.getModelId());
        dto.setOrgId(entity.getOrgId());
        dto.setModelName(entity.getModelName());
        dto.setModelNo(entity.getModelNo());
        dto.setBusinessPartnerId(entity.getBusinessPartnerId());
        dto.setAssetCategoryId(entity.getAssetCategoryId());
        dto.setAssetTypeId(entity.getAssetTypeId());
        dto.setAssetSubCategoryId(entity.getAssetSubCategoryId());
        dto.setAssetGroupId(entity.getAssetGroupId());
        dto.setVolumeLicensePresent(entity.getVolumeLicensePresent());
        dto.setInstallationType(entity.getInstallationType());
        dto.setTrackIndividualLicenses(entity.getTrackIndividualLicenses());
        dto.setMaintenanceThresholdPercentage(entity.getMaintenanceThresholdPercentage());
        dto.setExpectedLifeInYears(entity.getExpectedLifeInYears());
        dto.setDepreciationMethodId(entity.getDepreciationMethodId());
        dto.setRateOfDepreciation(entity.getRateOfDepreciation());
        dto.setScrapValuePercentage(entity.getScrapValuePercentage());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}