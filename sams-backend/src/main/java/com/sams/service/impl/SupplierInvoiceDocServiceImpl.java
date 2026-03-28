package com.sams.service.impl;

import com.sams.dto.SupplierInvoiceDocDTO;
import com.sams.entity.SupplierInvoiceDoc;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SupplierInvoiceDocRepository;
import com.sams.service.SupplierInvoiceDocService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierInvoiceDocServiceImpl implements SupplierInvoiceDocService {

    private final SupplierInvoiceDocRepository repository;

    @Override
    @Transactional
    public SupplierInvoiceDocDTO create(SupplierInvoiceDocDTO dto) {
        SupplierInvoiceDoc entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SupplierInvoiceDocDTO getById(Long id) {
        SupplierInvoiceDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierInvoiceDoc not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SupplierInvoiceDocDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SupplierInvoiceDocDTO update(Long id, SupplierInvoiceDocDTO dto) {
        SupplierInvoiceDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierInvoiceDoc not found with ID: " + id));
        SupplierInvoiceDoc mapped = mapToEntity(dto);
        mapped.setSupplierInvoiceDocId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SupplierInvoiceDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierInvoiceDoc not found with ID: " + id));
        repository.delete(entity);
    }

    private SupplierInvoiceDoc mapToEntity(SupplierInvoiceDocDTO dto) {
        SupplierInvoiceDoc entity = new SupplierInvoiceDoc();
        entity.setSupplierInvoiceDocId(dto.getSupplierInvoiceDocId());
        entity.setSupplierInvoiceHdrId(dto.getSupplierInvoiceHdrId());
        entity.setDocName(dto.getDocName());
        entity.setDocType(dto.getDocType());
        entity.setFilePath(dto.getFilePath());
        entity.setContentType(dto.getContentType());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SupplierInvoiceDocDTO mapToDTO(SupplierInvoiceDoc entity) {
        SupplierInvoiceDocDTO dto = new SupplierInvoiceDocDTO();
        dto.setSupplierInvoiceDocId(entity.getSupplierInvoiceDocId());
        dto.setSupplierInvoiceHdrId(entity.getSupplierInvoiceHdrId());
        dto.setDocName(entity.getDocName());
        dto.setDocType(entity.getDocType());
        dto.setFilePath(entity.getFilePath());
        dto.setContentType(entity.getContentType());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}