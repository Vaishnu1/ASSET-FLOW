package com.sams.service.impl;

import com.sams.dto.SupplierInvoiceTcInfoDTO;
import com.sams.entity.SupplierInvoiceTcInfo;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SupplierInvoiceTcInfoRepository;
import com.sams.service.SupplierInvoiceTcInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierInvoiceTcInfoServiceImpl implements SupplierInvoiceTcInfoService {

    private final SupplierInvoiceTcInfoRepository repository;

    @Override
    @Transactional
    public SupplierInvoiceTcInfoDTO create(SupplierInvoiceTcInfoDTO dto) {
        SupplierInvoiceTcInfo entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SupplierInvoiceTcInfoDTO getById(Long id) {
        SupplierInvoiceTcInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierInvoiceTcInfo not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SupplierInvoiceTcInfoDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SupplierInvoiceTcInfoDTO update(Long id, SupplierInvoiceTcInfoDTO dto) {
        SupplierInvoiceTcInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierInvoiceTcInfo not found with ID: " + id));
        SupplierInvoiceTcInfo mapped = mapToEntity(dto);
        mapped.setSupplierInvoiceTcInfoId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SupplierInvoiceTcInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierInvoiceTcInfo not found with ID: " + id));
        repository.delete(entity);
    }

    private SupplierInvoiceTcInfo mapToEntity(SupplierInvoiceTcInfoDTO dto) {
        SupplierInvoiceTcInfo entity = new SupplierInvoiceTcInfo();
        entity.setSupplierInvoiceTcInfoId(dto.getSupplierInvoiceTcInfoId());
        entity.setPoHdrId(dto.getPoHdrId());
        entity.setSupplierInvoiceHdrId(dto.getSupplierInvoiceHdrId());
        entity.setTcTemplateHdrId(dto.getTcTemplateHdrId());
        entity.setTcParameterId(dto.getTcParameterId());
        entity.setTcParameterName(dto.getTcParameterName());
        entity.setDisplaySequenceNo(dto.getDisplaySequenceNo());
        entity.setTcParameterChildId(dto.getTcParameterChildId());
        entity.setTcParameterChildName(dto.getTcParameterChildName());
        entity.setSelEnteredValues(dto.getSelEnteredValues());
        entity.setRemarks(dto.getRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SupplierInvoiceTcInfoDTO mapToDTO(SupplierInvoiceTcInfo entity) {
        SupplierInvoiceTcInfoDTO dto = new SupplierInvoiceTcInfoDTO();
        dto.setSupplierInvoiceTcInfoId(entity.getSupplierInvoiceTcInfoId());
        dto.setPoHdrId(entity.getPoHdrId());
        dto.setSupplierInvoiceHdrId(entity.getSupplierInvoiceHdrId());
        dto.setTcTemplateHdrId(entity.getTcTemplateHdrId());
        dto.setTcParameterId(entity.getTcParameterId());
        dto.setTcParameterName(entity.getTcParameterName());
        dto.setDisplaySequenceNo(entity.getDisplaySequenceNo());
        dto.setTcParameterChildId(entity.getTcParameterChildId());
        dto.setTcParameterChildName(entity.getTcParameterChildName());
        dto.setSelEnteredValues(entity.getSelEnteredValues());
        dto.setRemarks(entity.getRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}