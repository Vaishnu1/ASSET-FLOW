package com.sams.service.impl;

import com.sams.dto.PreInwDocumentDTO;
import com.sams.entity.PreInwDocument;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PreInwDocumentRepository;
import com.sams.service.PreInwDocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PreInwDocumentServiceImpl implements PreInwDocumentService {

    private final PreInwDocumentRepository repository;

    @Override
    @Transactional
    public PreInwDocumentDTO create(PreInwDocumentDTO dto) {
        PreInwDocument entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PreInwDocumentDTO getById(Long id) {
        PreInwDocument entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PreInwDocument not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PreInwDocumentDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PreInwDocumentDTO update(Long id, PreInwDocumentDTO dto) {
        PreInwDocument entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PreInwDocument not found with ID: " + id));
        PreInwDocument mapped = mapToEntity(dto);
        mapped.setAssetCertificateId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PreInwDocument entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PreInwDocument not found with ID: " + id));
        repository.delete(entity);
    }

    private PreInwDocument mapToEntity(PreInwDocumentDTO dto) {
        PreInwDocument entity = new PreInwDocument();
        entity.setAssetCertificateId(dto.getAssetCertificateId());
        entity.setOrgId(dto.getOrgId());
        entity.setInwardInventoryHdrId(dto.getInwardInventoryHdrId());
        entity.setInwardInventoryDtlId(dto.getInwardInventoryDtlId());
        entity.setCertificateId(dto.getCertificateId());
        entity.setIssueDate(dto.getIssueDate());
        entity.setStartDate(dto.getStartDate());
        entity.setExpiryDate(dto.getExpiryDate());
        entity.setFileCertificateNo(dto.getFileCertificateNo());
        entity.setDocumentNo(dto.getDocumentNo());
        entity.setDocType(dto.getDocType());
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

    private PreInwDocumentDTO mapToDTO(PreInwDocument entity) {
        PreInwDocumentDTO dto = new PreInwDocumentDTO();
        dto.setAssetCertificateId(entity.getAssetCertificateId());
        dto.setOrgId(entity.getOrgId());
        dto.setInwardInventoryHdrId(entity.getInwardInventoryHdrId());
        dto.setInwardInventoryDtlId(entity.getInwardInventoryDtlId());
        dto.setCertificateId(entity.getCertificateId());
        dto.setIssueDate(entity.getIssueDate());
        dto.setStartDate(entity.getStartDate());
        dto.setExpiryDate(entity.getExpiryDate());
        dto.setFileCertificateNo(entity.getFileCertificateNo());
        dto.setDocumentNo(entity.getDocumentNo());
        dto.setDocType(entity.getDocType());
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