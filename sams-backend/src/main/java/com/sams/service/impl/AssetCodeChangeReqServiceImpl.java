package com.sams.service.impl;

import com.sams.dto.AssetCodeChangeReqDTO;
import com.sams.entity.AssetCodeChangeReq;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetCodeChangeReqRepository;
import com.sams.service.AssetCodeChangeReqService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetCodeChangeReqServiceImpl implements AssetCodeChangeReqService {

    private final AssetCodeChangeReqRepository repository;

    @Override
    @Transactional
    public AssetCodeChangeReqDTO create(AssetCodeChangeReqDTO dto) {
        AssetCodeChangeReq entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetCodeChangeReqDTO getById(Long id) {
        AssetCodeChangeReq entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCodeChangeReq not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetCodeChangeReqDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetCodeChangeReqDTO update(Long id, AssetCodeChangeReqDTO dto) {
        AssetCodeChangeReq entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCodeChangeReq not found with ID: " + id));
        AssetCodeChangeReq mapped = mapToEntity(dto);
        mapped.setAssetCodeChangeReqId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetCodeChangeReq entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCodeChangeReq not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetCodeChangeReq mapToEntity(AssetCodeChangeReqDTO dto) {
        AssetCodeChangeReq entity = new AssetCodeChangeReq();
        entity.setAssetCodeChangeReqId(dto.getAssetCodeChangeReqId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setAssetId(dto.getAssetId());
        entity.setAssetCode(dto.getAssetCode());
        entity.setNewAssetCode(dto.getNewAssetCode());
        entity.setReason(dto.getReason());
        entity.setNewCeidStatus(dto.getNewCeidStatus());
        entity.setActive(dto.getActive());
        entity.setRequestRaisedBy(dto.getRequestRaisedBy());
        entity.setRequestRaisedDt(dto.getRequestRaisedDt());
        entity.setApprovedOrRejectedBy(dto.getApprovedOrRejectedBy());
        entity.setApprovedOrRejectedDt(dto.getApprovedOrRejectedDt());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private AssetCodeChangeReqDTO mapToDTO(AssetCodeChangeReq entity) {
        AssetCodeChangeReqDTO dto = new AssetCodeChangeReqDTO();
        dto.setAssetCodeChangeReqId(entity.getAssetCodeChangeReqId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setAssetId(entity.getAssetId());
        dto.setAssetCode(entity.getAssetCode());
        dto.setNewAssetCode(entity.getNewAssetCode());
        dto.setReason(entity.getReason());
        dto.setNewCeidStatus(entity.getNewCeidStatus());
        dto.setActive(entity.getActive());
        dto.setRequestRaisedBy(entity.getRequestRaisedBy());
        dto.setRequestRaisedDt(entity.getRequestRaisedDt());
        dto.setApprovedOrRejectedBy(entity.getApprovedOrRejectedBy());
        dto.setApprovedOrRejectedDt(entity.getApprovedOrRejectedDt());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}