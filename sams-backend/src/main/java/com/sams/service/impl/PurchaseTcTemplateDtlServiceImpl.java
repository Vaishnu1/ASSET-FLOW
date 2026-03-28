package com.sams.service.impl;

import com.sams.dto.PurchaseTcTemplateDtlDTO;
import com.sams.entity.PurchaseTcTemplateDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PurchaseTcTemplateDtlRepository;
import com.sams.service.PurchaseTcTemplateDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PurchaseTcTemplateDtlServiceImpl implements PurchaseTcTemplateDtlService {

    private final PurchaseTcTemplateDtlRepository repository;

    @Override
    @Transactional
    public PurchaseTcTemplateDtlDTO create(PurchaseTcTemplateDtlDTO dto) {
        PurchaseTcTemplateDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PurchaseTcTemplateDtlDTO getById(Long id) {
        PurchaseTcTemplateDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchaseTcTemplateDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PurchaseTcTemplateDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PurchaseTcTemplateDtlDTO update(Long id, PurchaseTcTemplateDtlDTO dto) {
        PurchaseTcTemplateDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchaseTcTemplateDtl not found with ID: " + id));
        PurchaseTcTemplateDtl mapped = mapToEntity(dto);
        mapped.setTcTemplateDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PurchaseTcTemplateDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchaseTcTemplateDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private PurchaseTcTemplateDtl mapToEntity(PurchaseTcTemplateDtlDTO dto) {
        PurchaseTcTemplateDtl entity = new PurchaseTcTemplateDtl();
        entity.setTcTemplateDtlId(dto.getTcTemplateDtlId());
        entity.setTcTemplateHdrId(dto.getTcTemplateHdrId());
        entity.setTcParameterId(dto.getTcParameterId());
        entity.setTcParameterName(dto.getTcParameterName());
        entity.setDisplaySequenceNo(dto.getDisplaySequenceNo());
        entity.setTcParameterChildId(dto.getTcParameterChildId());
        entity.setTcParameterChildName(dto.getTcParameterChildName());
        entity.setActive(dto.getActive());
        entity.setRemarks(dto.getRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setTcParameterChildEditable(dto.getTcParameterChildEditable());
        entity.setTcParameterEditable(dto.getTcParameterEditable());
        return entity;
    }

    private PurchaseTcTemplateDtlDTO mapToDTO(PurchaseTcTemplateDtl entity) {
        PurchaseTcTemplateDtlDTO dto = new PurchaseTcTemplateDtlDTO();
        dto.setTcTemplateDtlId(entity.getTcTemplateDtlId());
        dto.setTcTemplateHdrId(entity.getTcTemplateHdrId());
        dto.setTcParameterId(entity.getTcParameterId());
        dto.setTcParameterName(entity.getTcParameterName());
        dto.setDisplaySequenceNo(entity.getDisplaySequenceNo());
        dto.setTcParameterChildId(entity.getTcParameterChildId());
        dto.setTcParameterChildName(entity.getTcParameterChildName());
        dto.setActive(entity.getActive());
        dto.setRemarks(entity.getRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setTcParameterChildEditable(entity.getTcParameterChildEditable());
        dto.setTcParameterEditable(entity.getTcParameterEditable());
        return dto;
    }
}