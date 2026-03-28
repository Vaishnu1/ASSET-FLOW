package com.sams.service.impl;

import com.sams.dto.AdditionalInfoDTO;
import com.sams.entity.AdditionalInfo;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AdditionalInfoRepository;
import com.sams.service.AdditionalInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdditionalInfoServiceImpl implements AdditionalInfoService {

    private final AdditionalInfoRepository repository;

    @Override
    @Transactional
    public AdditionalInfoDTO createAdditionalInfo(AdditionalInfoDTO dto) {
        AdditionalInfo entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AdditionalInfoDTO getAdditionalInfoById(Long id) {
        AdditionalInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AdditionalInfo not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AdditionalInfoDTO> getAllAdditionalInfos() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AdditionalInfoDTO updateAdditionalInfo(Long id, AdditionalInfoDTO dto) {
        AdditionalInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AdditionalInfo not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        AdditionalInfo mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteAdditionalInfo(Long id) {
        AdditionalInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AdditionalInfo not found with ID: " + id));
        repository.delete(entity);
    }

    private AdditionalInfo mapToEntity(AdditionalInfoDTO dto) {
        AdditionalInfo entity = new AdditionalInfo();
        entity.setModelOtherInfoId(dto.getModelOtherInfoId());
        entity.setOrgId(dto.getOrgId());
        entity.setModelId(dto.getModelId());
        entity.setInfoName(dto.getInfoName());
        entity.setInfoLabel(dto.getInfoLabel());
        entity.setInfoTitle(dto.getInfoTitle());
        entity.setIntoType(dto.getIntoType());
        entity.setInfoDetails(dto.getInfoDetails());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        return entity;
    }

    private AdditionalInfoDTO mapToDTO(AdditionalInfo entity) {
        AdditionalInfoDTO dto = new AdditionalInfoDTO();
        dto.setId(entity.getId());
        dto.setModelOtherInfoId(entity.getModelOtherInfoId());
        dto.setOrgId(entity.getOrgId());
        dto.setModelId(entity.getModelId());
        dto.setInfoName(entity.getInfoName());
        dto.setInfoLabel(entity.getInfoLabel());
        dto.setInfoTitle(entity.getInfoTitle());
        dto.setIntoType(entity.getIntoType());
        dto.setInfoDetails(entity.getInfoDetails());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        return dto;
    }
}