package com.sams.service.impl;

import com.sams.dto.CustFieldDtlDTO;
import com.sams.entity.CustFieldDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.CustFieldDtlRepository;
import com.sams.service.CustFieldDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustFieldDtlServiceImpl implements CustFieldDtlService {

    private final CustFieldDtlRepository repository;

    @Override
    @Transactional
    public CustFieldDtlDTO createCustFieldDtl(CustFieldDtlDTO dto) {
        CustFieldDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public CustFieldDtlDTO getCustFieldDtlById(Long id) {
        CustFieldDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustFieldDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<CustFieldDtlDTO> getAllCustFieldDtls() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CustFieldDtlDTO updateCustFieldDtl(Long id, CustFieldDtlDTO dto) {
        CustFieldDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustFieldDtl not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        CustFieldDtl mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteCustFieldDtl(Long id) {
        CustFieldDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustFieldDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private CustFieldDtl mapToEntity(CustFieldDtlDTO dto) {
        CustFieldDtl entity = new CustFieldDtl();
        entity.setCustomDtlId(dto.getCustomDtlId());
        entity.setCustomHdrId(dto.getCustomHdrId());
        entity.setCustomValues(dto.getCustomValues());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        return entity;
    }

    private CustFieldDtlDTO mapToDTO(CustFieldDtl entity) {
        CustFieldDtlDTO dto = new CustFieldDtlDTO();
        dto.setId(entity.getId());
        dto.setCustomDtlId(entity.getCustomDtlId());
        dto.setCustomHdrId(entity.getCustomHdrId());
        dto.setCustomValues(entity.getCustomValues());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        return dto;
    }
}