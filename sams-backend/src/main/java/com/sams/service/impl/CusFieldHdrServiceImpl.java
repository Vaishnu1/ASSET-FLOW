package com.sams.service.impl;

import com.sams.dto.CusFieldHdrDTO;
import com.sams.entity.CusFieldHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.CusFieldHdrRepository;
import com.sams.service.CusFieldHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CusFieldHdrServiceImpl implements CusFieldHdrService {

    private final CusFieldHdrRepository repository;

    @Override
    @Transactional
    public CusFieldHdrDTO createCusFieldHdr(CusFieldHdrDTO dto) {
        CusFieldHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public CusFieldHdrDTO getCusFieldHdrById(Long id) {
        CusFieldHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CusFieldHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<CusFieldHdrDTO> getAllCusFieldHdrs() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CusFieldHdrDTO updateCusFieldHdr(Long id, CusFieldHdrDTO dto) {
        CusFieldHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CusFieldHdr not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        CusFieldHdr mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteCusFieldHdr(Long id) {
        CusFieldHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CusFieldHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private CusFieldHdr mapToEntity(CusFieldHdrDTO dto) {
        CusFieldHdr entity = new CusFieldHdr();
        entity.setCustomHdrId(dto.getCustomHdrId());
        entity.setCustomFieldValId(dto.getCustomFieldValId());
        entity.setOrgId(dto.getOrgId());
        entity.setAssetSubCategoryId(dto.getAssetSubCategoryId());
        entity.setLabelName(dto.getLabelName());
        entity.setInputType(dto.getInputType());
        entity.setInputMaxLength(dto.getInputMaxLength());
        entity.setActive(dto.getActive());
        entity.setValue(dto.getValue());
        entity.setValues(dto.getValues());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setCustomComboList(dto.getCustomComboList());
        entity.setAssetCustomFieldValue(dto.getAssetCustomFieldValue());
        entity.setValue1(dto.getValue1());
        entity.setBasedOn(dto.getBasedOn());
        entity.setBasedOnDisp(dto.getBasedOnDisp());
        entity.setDisplayGroup(dto.getDisplayGroup());
        entity.setColor(dto.getColor());
        entity.setDisplayGroupId(dto.getDisplayGroupId());
        entity.setAssetGroupId(dto.getAssetGroupId());
        entity.setModelId(dto.getModelId());
        entity.setTransactionId(dto.getTransactionId());
        entity.setTransactionSrc(dto.getTransactionSrc());
        return entity;
    }

    private CusFieldHdrDTO mapToDTO(CusFieldHdr entity) {
        CusFieldHdrDTO dto = new CusFieldHdrDTO();
        dto.setId(entity.getId());
        dto.setCustomHdrId(entity.getCustomHdrId());
        dto.setCustomFieldValId(entity.getCustomFieldValId());
        dto.setOrgId(entity.getOrgId());
        dto.setAssetSubCategoryId(entity.getAssetSubCategoryId());
        dto.setLabelName(entity.getLabelName());
        dto.setInputType(entity.getInputType());
        dto.setInputMaxLength(entity.getInputMaxLength());
        dto.setActive(entity.getActive());
        dto.setValue(entity.getValue());
        dto.setValues(entity.getValues());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setCustomComboList(entity.getCustomComboList());
        dto.setAssetCustomFieldValue(entity.getAssetCustomFieldValue());
        dto.setValue1(entity.getValue1());
        dto.setBasedOn(entity.getBasedOn());
        dto.setBasedOnDisp(entity.getBasedOnDisp());
        dto.setDisplayGroup(entity.getDisplayGroup());
        dto.setColor(entity.getColor());
        dto.setDisplayGroupId(entity.getDisplayGroupId());
        dto.setAssetGroupId(entity.getAssetGroupId());
        dto.setModelId(entity.getModelId());
        dto.setTransactionId(entity.getTransactionId());
        dto.setTransactionSrc(entity.getTransactionSrc());
        return dto;
    }
}