package com.sams.service.impl;

import com.sams.dto.AssetCertificateDTO;
import com.sams.entity.AssetCertificate;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetCertificateRepository;
import com.sams.service.AssetCertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetCertificateServiceImpl implements AssetCertificateService {

    private final AssetCertificateRepository repository;

    @Override
    @Transactional
    public AssetCertificateDTO create(AssetCertificateDTO dto) {
        AssetCertificate entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetCertificateDTO getById(Long id) {
        AssetCertificate entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCertificate not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetCertificateDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetCertificateDTO update(Long id, AssetCertificateDTO dto) {
        AssetCertificate entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCertificate not found with ID: " + id));
        AssetCertificate mapped = mapToEntity(dto);
        mapped.setAssetCertificateId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetCertificate entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCertificate not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetCertificate mapToEntity(AssetCertificateDTO dto) {
        AssetCertificate entity = new AssetCertificate();
        entity.setAssetCertificateId(dto.getAssetCertificateId());
        entity.setOrgId(dto.getOrgId());
        entity.setAssetId(dto.getAssetId());
        entity.setCertificateId(dto.getCertificateId());
        entity.setIssueDate(dto.getIssueDate());
        entity.setStartDate(dto.getStartDate());
        entity.setExpiryDate(dto.getExpiryDate());
        entity.setFileCertificateNo(dto.getFileCertificateNo());
        entity.setDocumentNo(dto.getDocumentNo());
        entity.setContentType(dto.getContentType());
        entity.setDocName(dto.getDocName());
        entity.setFilePath(dto.getFilePath());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private AssetCertificateDTO mapToDTO(AssetCertificate entity) {
        AssetCertificateDTO dto = new AssetCertificateDTO();
        dto.setAssetCertificateId(entity.getAssetCertificateId());
        dto.setOrgId(entity.getOrgId());
        dto.setAssetId(entity.getAssetId());
        dto.setCertificateId(entity.getCertificateId());
        dto.setIssueDate(entity.getIssueDate());
        dto.setStartDate(entity.getStartDate());
        dto.setExpiryDate(entity.getExpiryDate());
        dto.setFileCertificateNo(entity.getFileCertificateNo());
        dto.setDocumentNo(entity.getDocumentNo());
        dto.setContentType(entity.getContentType());
        dto.setDocName(entity.getDocName());
        dto.setFilePath(entity.getFilePath());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}