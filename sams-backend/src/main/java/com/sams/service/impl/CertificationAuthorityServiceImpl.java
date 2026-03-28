package com.sams.service.impl;

import com.sams.dto.CertificationAuthorityDTO;
import com.sams.entity.CertificationAuthority;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.CertificationAuthorityRepository;
import com.sams.service.CertificationAuthorityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CertificationAuthorityServiceImpl implements CertificationAuthorityService {

    private final CertificationAuthorityRepository repository;

    @Override
    @Transactional
    public CertificationAuthorityDTO createCertificationAuthority(CertificationAuthorityDTO dto) {
        CertificationAuthority entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public CertificationAuthorityDTO getCertificationAuthorityById(Long id) {
        CertificationAuthority entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CertificationAuthority not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<CertificationAuthorityDTO> getAllCertificationAuthorities() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CertificationAuthorityDTO updateCertificationAuthority(Long id, CertificationAuthorityDTO dto) {
        CertificationAuthority entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CertificationAuthority not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        CertificationAuthority mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteCertificationAuthority(Long id) {
        CertificationAuthority entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CertificationAuthority not found with ID: " + id));
        repository.delete(entity);
    }

    private CertificationAuthority mapToEntity(CertificationAuthorityDTO dto) {
        CertificationAuthority entity = new CertificationAuthority();
        entity.setCertificationAuthorityId(dto.getCertificationAuthorityId());
        entity.setOrgId(dto.getOrgId());
        entity.setCertificationAuthorityName(dto.getCertificationAuthorityName());
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

    private CertificationAuthorityDTO mapToDTO(CertificationAuthority entity) {
        CertificationAuthorityDTO dto = new CertificationAuthorityDTO();
        dto.setId(entity.getId());
        dto.setCertificationAuthorityId(entity.getCertificationAuthorityId());
        dto.setOrgId(entity.getOrgId());
        dto.setCertificationAuthorityName(entity.getCertificationAuthorityName());
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