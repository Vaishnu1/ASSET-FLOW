package com.sams.service.impl;

import com.sams.dto.SupplierInvoicePaymentsDTO;
import com.sams.entity.SupplierInvoicePayments;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SupplierInvoicePaymentsRepository;
import com.sams.service.SupplierInvoicePaymentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierInvoicePaymentsServiceImpl implements SupplierInvoicePaymentsService {

    private final SupplierInvoicePaymentsRepository repository;

    @Override
    @Transactional
    public SupplierInvoicePaymentsDTO create(SupplierInvoicePaymentsDTO dto) {
        SupplierInvoicePayments entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SupplierInvoicePaymentsDTO getById(Long id) {
        SupplierInvoicePayments entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierInvoicePayments not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SupplierInvoicePaymentsDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SupplierInvoicePaymentsDTO update(Long id, SupplierInvoicePaymentsDTO dto) {
        SupplierInvoicePayments entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierInvoicePayments not found with ID: " + id));
        SupplierInvoicePayments mapped = mapToEntity(dto);
        mapped.setSupplierInvoicePaymentId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SupplierInvoicePayments entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierInvoicePayments not found with ID: " + id));
        repository.delete(entity);
    }

    private SupplierInvoicePayments mapToEntity(SupplierInvoicePaymentsDTO dto) {
        SupplierInvoicePayments entity = new SupplierInvoicePayments();
        entity.setSupplierInvoicePaymentId(dto.getSupplierInvoicePaymentId());
        entity.setSupplierInvoiceHdrId(dto.getSupplierInvoiceHdrId());
        entity.setPoNo(dto.getPoNo());
        entity.setPoId(dto.getPoId());
        entity.setPaymentNo(dto.getPaymentNo());
        entity.setPaymentDt(dto.getPaymentDt());
        entity.setPaymentType(dto.getPaymentType());
        entity.setTransactionId(dto.getTransactionId());
        entity.setTransferBankDetails(dto.getTransferBankDetails());
        entity.setRemarks(dto.getRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SupplierInvoicePaymentsDTO mapToDTO(SupplierInvoicePayments entity) {
        SupplierInvoicePaymentsDTO dto = new SupplierInvoicePaymentsDTO();
        dto.setSupplierInvoicePaymentId(entity.getSupplierInvoicePaymentId());
        dto.setSupplierInvoiceHdrId(entity.getSupplierInvoiceHdrId());
        dto.setPoNo(entity.getPoNo());
        dto.setPoId(entity.getPoId());
        dto.setPaymentNo(entity.getPaymentNo());
        dto.setPaymentDt(entity.getPaymentDt());
        dto.setPaymentType(entity.getPaymentType());
        dto.setTransactionId(entity.getTransactionId());
        dto.setTransferBankDetails(entity.getTransferBankDetails());
        dto.setRemarks(entity.getRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}