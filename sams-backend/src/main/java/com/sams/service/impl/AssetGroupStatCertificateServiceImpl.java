package com.sams.service.impl;

import com.sams.dto.AssetGroupStatCertificateDTO;
import com.sams.entity.AssetGroupStatCertificate;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetGroupStatCertificateRepository;
import com.sams.service.AssetGroupStatCertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetGroupStatCertificateServiceImpl implements AssetGroupStatCertificateService {

    private final AssetGroupStatCertificateRepository repository;

    @Override
    @Transactional
    public AssetGroupStatCertificateDTO create(AssetGroupStatCertificateDTO dto) {
        AssetGroupStatCertificate entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetGroupStatCertificateDTO getById(Long id) {
        AssetGroupStatCertificate entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetGroupStatCertificate not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetGroupStatCertificateDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetGroupStatCertificateDTO update(Long id, AssetGroupStatCertificateDTO dto) {
        AssetGroupStatCertificate entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetGroupStatCertificate not found with ID: " + id));
        AssetGroupStatCertificate mapped = mapToEntity(dto);
        mapped.setAssetGroupStatId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetGroupStatCertificate entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetGroupStatCertificate not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetGroupStatCertificate mapToEntity(AssetGroupStatCertificateDTO dto) {
        AssetGroupStatCertificate entity = new AssetGroupStatCertificate();
        entity.setAssetGroupStatId(dto.getAssetGroupStatId());
        entity.setOrgId(dto.getOrgId());
        entity.setAssetGroupId(dto.getAssetGroupId());
        entity.setCertificateId(dto.getCertificateId());
        entity.setCertificateName(dto.getCertificateName());
        entity.setMandatoryRequiredStage(dto.getMandatoryRequiredStage());
        entity.setRequired(dto.getRequired());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private AssetGroupStatCertificateDTO mapToDTO(AssetGroupStatCertificate entity) {
        AssetGroupStatCertificateDTO dto = new AssetGroupStatCertificateDTO();
        dto.setAssetGroupStatId(entity.getAssetGroupStatId());
        dto.setOrgId(entity.getOrgId());
        dto.setAssetGroupId(entity.getAssetGroupId());
        dto.setCertificateId(entity.getCertificateId());
        dto.setCertificateName(entity.getCertificateName());
        dto.setMandatoryRequiredStage(entity.getMandatoryRequiredStage());
        dto.setRequired(entity.getRequired());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}