package com.sams.service.impl;

import com.sams.dto.GatePassDtlDTO;
import com.sams.entity.GatePassDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.GatePassDtlRepository;
import com.sams.service.GatePassDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GatePassDtlServiceImpl implements GatePassDtlService {

    private final GatePassDtlRepository repository;

    @Override
    @Transactional
    public GatePassDtlDTO create(GatePassDtlDTO dto) {
        GatePassDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public GatePassDtlDTO getById(Long id) {
        GatePassDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GatePassDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<GatePassDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public GatePassDtlDTO update(Long id, GatePassDtlDTO dto) {
        GatePassDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GatePassDtl not found with ID: " + id));
        GatePassDtl mapped = mapToEntity(dto);
        mapped.setGatePassDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        GatePassDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GatePassDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private GatePassDtl mapToEntity(GatePassDtlDTO dto) {
        GatePassDtl entity = new GatePassDtl();
        entity.setGatePassDtlId(dto.getGatePassDtlId());
        entity.setGatePassHdrId(dto.getGatePassHdrId());
        entity.setGatePassFor(dto.getGatePassFor());
        entity.setAssetId(dto.getAssetId());
        entity.setAssetCode(dto.getAssetCode());
        entity.setTransactionId(dto.getTransactionId());
        entity.setTransactionName(dto.getTransactionName());
        entity.setReturnType(dto.getReturnType());
        entity.setAssetRemarks(dto.getAssetRemarks());
        entity.setQuantity(dto.getQuantity());
        entity.setReturnedStatus(dto.getReturnedStatus());
        entity.setReturnReceivedById(dto.getReturnReceivedById());
        entity.setReturnReceviedDt(dto.getReturnReceviedDt());
        entity.setExpectedReturnDt(dto.getExpectedReturnDt());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setReturnRemarks(dto.getReturnRemarks());
        return entity;
    }

    private GatePassDtlDTO mapToDTO(GatePassDtl entity) {
        GatePassDtlDTO dto = new GatePassDtlDTO();
        dto.setGatePassDtlId(entity.getGatePassDtlId());
        dto.setGatePassHdrId(entity.getGatePassHdrId());
        dto.setGatePassFor(entity.getGatePassFor());
        dto.setAssetId(entity.getAssetId());
        dto.setAssetCode(entity.getAssetCode());
        dto.setTransactionId(entity.getTransactionId());
        dto.setTransactionName(entity.getTransactionName());
        dto.setReturnType(entity.getReturnType());
        dto.setAssetRemarks(entity.getAssetRemarks());
        dto.setQuantity(entity.getQuantity());
        dto.setReturnedStatus(entity.getReturnedStatus());
        dto.setReturnReceivedById(entity.getReturnReceivedById());
        dto.setReturnReceviedDt(entity.getReturnReceviedDt());
        dto.setExpectedReturnDt(entity.getExpectedReturnDt());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setReturnRemarks(entity.getReturnRemarks());
        return dto;
    }
}