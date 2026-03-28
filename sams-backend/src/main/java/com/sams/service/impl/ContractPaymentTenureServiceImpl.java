package com.sams.service.impl;

import com.sams.dto.ContractPaymentTenureDTO;
import com.sams.entity.ContractPaymentTenure;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ContractPaymentTenureRepository;
import com.sams.service.ContractPaymentTenureService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContractPaymentTenureServiceImpl implements ContractPaymentTenureService {

    private final ContractPaymentTenureRepository repository;

    @Override
    @Transactional
    public ContractPaymentTenureDTO create(ContractPaymentTenureDTO dto) {
        ContractPaymentTenure entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ContractPaymentTenureDTO getById(Long id) {
        ContractPaymentTenure entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractPaymentTenure not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ContractPaymentTenureDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ContractPaymentTenureDTO update(Long id, ContractPaymentTenureDTO dto) {
        ContractPaymentTenure entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractPaymentTenure not found with ID: " + id));
        ContractPaymentTenure mapped = mapToEntity(dto);
        mapped.setContractPaymentTenureId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ContractPaymentTenure entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractPaymentTenure not found with ID: " + id));
        repository.delete(entity);
    }

    private ContractPaymentTenure mapToEntity(ContractPaymentTenureDTO dto) {
        ContractPaymentTenure entity = new ContractPaymentTenure();
        entity.setContractPaymentTenureId(dto.getContractPaymentTenureId());
        entity.setContractId(dto.getContractId());
        entity.setPaymentAmount(dto.getPaymentAmount());
        entity.setPaymentDate(dto.getPaymentDate());
        entity.setPaymentMode(dto.getPaymentMode());
        entity.setInstrumentNo(dto.getInstrumentNo());
        entity.setInstrumentAmnt(dto.getInstrumentAmnt());
        entity.setInstrumentDate(dto.getInstrumentDate());
        entity.setBankName(dto.getBankName());
        entity.setRemarks(dto.getRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ContractPaymentTenureDTO mapToDTO(ContractPaymentTenure entity) {
        ContractPaymentTenureDTO dto = new ContractPaymentTenureDTO();
        dto.setContractPaymentTenureId(entity.getContractPaymentTenureId());
        dto.setContractId(entity.getContractId());
        dto.setPaymentAmount(entity.getPaymentAmount());
        dto.setPaymentDate(entity.getPaymentDate());
        dto.setPaymentMode(entity.getPaymentMode());
        dto.setInstrumentNo(entity.getInstrumentNo());
        dto.setInstrumentAmnt(entity.getInstrumentAmnt());
        dto.setInstrumentDate(entity.getInstrumentDate());
        dto.setBankName(entity.getBankName());
        dto.setRemarks(entity.getRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}