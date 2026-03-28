package com.sams.service.impl;

import com.sams.dto.ApPaymentDTO;
import com.sams.entity.ApPayment;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ApPaymentRepository;
import com.sams.service.ApPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApPaymentServiceImpl implements ApPaymentService {

    private final ApPaymentRepository repository;

    @Override
    @Transactional
    public ApPaymentDTO create(ApPaymentDTO dto) {
        ApPayment entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ApPaymentDTO getById(Long id) {
        ApPayment entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ApPayment not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ApPaymentDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ApPaymentDTO update(Long id, ApPaymentDTO dto) {
        ApPayment entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ApPayment not found with ID: " + id));
        ApPayment mapped = mapToEntity(dto);
        mapped.setPaymentId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ApPayment entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ApPayment not found with ID: " + id));
        repository.delete(entity);
    }

    private ApPayment mapToEntity(ApPaymentDTO dto) {
        ApPayment entity = new ApPayment();
        entity.setPaymentId(dto.getPaymentId());
        entity.setLocId(dto.getLocId());
        entity.setLocName(dto.getLocName());
        entity.setPaymentNo(dto.getPaymentNo());
        entity.setPaymentDt(dto.getPaymentDt());
        entity.setPaymentType(dto.getPaymentType());
        entity.setPaymentBankId(dto.getPaymentBankId());
        entity.setPaymentBankName(dto.getPaymentBankName());
        entity.setBankId(dto.getBankId());
        entity.setBankName(dto.getBankName());
        entity.setBankAccountNo(dto.getBankAccountNo());
        entity.setBankCurCd(dto.getBankCurCd());
        entity.setFunctionalCurCd(dto.getFunctionalCurCd());
        entity.setFunctionalAmt(dto.getFunctionalAmt());
        entity.setAppliedAmt(dto.getAppliedAmt());
        entity.setPaymentAmt(dto.getPaymentAmt());
        entity.setUnappliedAmt(dto.getUnappliedAmt());
        entity.setSuppId(dto.getSuppId());
        entity.setSuppName(dto.getSuppName());
        entity.setSuppBankId(dto.getSuppBankId());
        entity.setSuppBankName(dto.getSuppBankName());
        entity.setSuppBankAccountNo(dto.getSuppBankAccountNo());
        entity.setSuppBankCurCd(dto.getSuppBankCurCd());
        entity.setPaymentCurCd(dto.getPaymentCurCd());
        entity.setExchRate(dto.getExchRate());
        entity.setPrepaymentAmt(dto.getPrepaymentAmt());
        entity.setUnidentifiedAmt(dto.getUnidentifiedAmt());
        entity.setDepositDate(dto.getDepositDate());
        entity.setInstrumentNo(dto.getInstrumentNo());
        entity.setInstrumentDt(dto.getInstrumentDt());
        entity.setPaymentStatus(dto.getPaymentStatus());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setReverseDt(dto.getReverseDt());
        entity.setReasonId(dto.getReasonId());
        entity.setReasonDesc(dto.getReasonDesc());
        entity.setReverseComments(dto.getReverseComments());
        entity.setApComments(dto.getApComments());
        entity.setLocAppliedAmt(dto.getLocAppliedAmt());
        entity.setLocPaymentAmt(dto.getLocPaymentAmt());
        entity.setAddress1(dto.getAddress1());
        entity.setAddress2(dto.getAddress2());
        entity.setCity(dto.getCity());
        entity.setSuppInvoiceNo(dto.getSuppInvoiceNo());
        return entity;
    }

    private ApPaymentDTO mapToDTO(ApPayment entity) {
        ApPaymentDTO dto = new ApPaymentDTO();
        dto.setPaymentId(entity.getPaymentId());
        dto.setLocId(entity.getLocId());
        dto.setLocName(entity.getLocName());
        dto.setPaymentNo(entity.getPaymentNo());
        dto.setPaymentDt(entity.getPaymentDt());
        dto.setPaymentType(entity.getPaymentType());
        dto.setPaymentBankId(entity.getPaymentBankId());
        dto.setPaymentBankName(entity.getPaymentBankName());
        dto.setBankId(entity.getBankId());
        dto.setBankName(entity.getBankName());
        dto.setBankAccountNo(entity.getBankAccountNo());
        dto.setBankCurCd(entity.getBankCurCd());
        dto.setFunctionalCurCd(entity.getFunctionalCurCd());
        dto.setFunctionalAmt(entity.getFunctionalAmt());
        dto.setAppliedAmt(entity.getAppliedAmt());
        dto.setPaymentAmt(entity.getPaymentAmt());
        dto.setUnappliedAmt(entity.getUnappliedAmt());
        dto.setSuppId(entity.getSuppId());
        dto.setSuppName(entity.getSuppName());
        dto.setSuppBankId(entity.getSuppBankId());
        dto.setSuppBankName(entity.getSuppBankName());
        dto.setSuppBankAccountNo(entity.getSuppBankAccountNo());
        dto.setSuppBankCurCd(entity.getSuppBankCurCd());
        dto.setPaymentCurCd(entity.getPaymentCurCd());
        dto.setExchRate(entity.getExchRate());
        dto.setPrepaymentAmt(entity.getPrepaymentAmt());
        dto.setUnidentifiedAmt(entity.getUnidentifiedAmt());
        dto.setDepositDate(entity.getDepositDate());
        dto.setInstrumentNo(entity.getInstrumentNo());
        dto.setInstrumentDt(entity.getInstrumentDt());
        dto.setPaymentStatus(entity.getPaymentStatus());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setReverseDt(entity.getReverseDt());
        dto.setReasonId(entity.getReasonId());
        dto.setReasonDesc(entity.getReasonDesc());
        dto.setReverseComments(entity.getReverseComments());
        dto.setApComments(entity.getApComments());
        dto.setLocAppliedAmt(entity.getLocAppliedAmt());
        dto.setLocPaymentAmt(entity.getLocPaymentAmt());
        dto.setAddress1(entity.getAddress1());
        dto.setAddress2(entity.getAddress2());
        dto.setCity(entity.getCity());
        dto.setSuppInvoiceNo(entity.getSuppInvoiceNo());
        return dto;
    }
}