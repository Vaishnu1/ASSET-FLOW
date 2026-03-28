package com.sams.service.impl;

import com.sams.dto.CertificateDTO;
import com.sams.entity.Certificate;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.CertificateRepository;
import com.sams.service.CertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CertificateServiceImpl implements CertificateService {

    private final CertificateRepository repository;

    @Override
    @Transactional
    public CertificateDTO createCertificate(CertificateDTO dto) {
        Certificate entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public CertificateDTO getCertificateById(Long id) {
        Certificate entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Certificate not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<CertificateDTO> getAllCertificates() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CertificateDTO updateCertificate(Long id, CertificateDTO dto) {
        Certificate entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Certificate not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        Certificate mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteCertificate(Long id) {
        Certificate entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Certificate not found with ID: " + id));
        repository.delete(entity);
    }

    private Certificate mapToEntity(CertificateDTO dto) {
        Certificate entity = new Certificate();
        entity.setCertificateId(dto.getCertificateId());
        entity.setOrgId(dto.getOrgId());
        entity.setCertificationAuthorityId(dto.getCertificationAuthorityId());
        entity.setCertificationAuthorityName(dto.getCertificationAuthorityName());
        entity.setCertificateName(dto.getCertificateName());
        entity.setRenewalRequired(dto.getRenewalRequired());
        entity.setIssuingAuthority(dto.getIssuingAuthority());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setOrgName(dto.getOrgName());
        entity.setColumnName(dto.getColumnName());
        entity.setDirection(dto.getDirection());
        return entity;
    }

    private CertificateDTO mapToDTO(Certificate entity) {
        CertificateDTO dto = new CertificateDTO();
        dto.setId(entity.getId());
        dto.setCertificateId(entity.getCertificateId());
        dto.setOrgId(entity.getOrgId());
        dto.setCertificationAuthorityId(entity.getCertificationAuthorityId());
        dto.setCertificationAuthorityName(entity.getCertificationAuthorityName());
        dto.setCertificateName(entity.getCertificateName());
        dto.setRenewalRequired(entity.getRenewalRequired());
        dto.setIssuingAuthority(entity.getIssuingAuthority());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setOrgName(entity.getOrgName());
        dto.setColumnName(entity.getColumnName());
        dto.setDirection(entity.getDirection());
        return dto;
    }
}