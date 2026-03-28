package com.sams.service.impl;

import com.sams.dto.ContractTcInfoDTO;
import com.sams.entity.ContractTcInfo;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ContractTcInfoRepository;
import com.sams.service.ContractTcInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContractTcInfoServiceImpl implements ContractTcInfoService {

    private final ContractTcInfoRepository repository;

    @Override
    @Transactional
    public ContractTcInfoDTO create(ContractTcInfoDTO dto) {
        ContractTcInfo entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ContractTcInfoDTO getById(Long id) {
        ContractTcInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractTcInfo not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ContractTcInfoDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ContractTcInfoDTO update(Long id, ContractTcInfoDTO dto) {
        ContractTcInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractTcInfo not found with ID: " + id));
        ContractTcInfo mapped = mapToEntity(dto);
        mapped.setContractTcInfoId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ContractTcInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractTcInfo not found with ID: " + id));
        repository.delete(entity);
    }

    private ContractTcInfo mapToEntity(ContractTcInfoDTO dto) {
        ContractTcInfo entity = new ContractTcInfo();
        entity.setContractTcInfoId(dto.getContractTcInfoId());
        entity.setContractId(dto.getContractId());
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

    private ContractTcInfoDTO mapToDTO(ContractTcInfo entity) {
        ContractTcInfoDTO dto = new ContractTcInfoDTO();
        dto.setContractTcInfoId(entity.getContractTcInfoId());
        dto.setContractId(entity.getContractId());
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