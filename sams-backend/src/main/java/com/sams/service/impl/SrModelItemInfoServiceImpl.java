package com.sams.service.impl;

import com.sams.dto.SrModelItemInfoDTO;
import com.sams.entity.SrModelItemInfo;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrModelItemInfoRepository;
import com.sams.service.SrModelItemInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrModelItemInfoServiceImpl implements SrModelItemInfoService {

    private final SrModelItemInfoRepository repository;

    @Override
    @Transactional
    public SrModelItemInfoDTO create(SrModelItemInfoDTO dto) {
        SrModelItemInfo entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrModelItemInfoDTO getById(Long id) {
        SrModelItemInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrModelItemInfo not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrModelItemInfoDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrModelItemInfoDTO update(Long id, SrModelItemInfoDTO dto) {
        SrModelItemInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrModelItemInfo not found with ID: " + id));
        SrModelItemInfo mapped = mapToEntity(dto);
        mapped.setSrModelItemId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrModelItemInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrModelItemInfo not found with ID: " + id));
        repository.delete(entity);
    }

    private SrModelItemInfo mapToEntity(SrModelItemInfoDTO dto) {
        SrModelItemInfo entity = new SrModelItemInfo();
        entity.setSrModelItemId(dto.getSrModelItemId());
        entity.setSrId(dto.getSrId());
        entity.setOrgId(dto.getOrgId());
        entity.setModelItemId(dto.getModelItemId());
        entity.setItemName(dto.getItemName());
        entity.setItemType(dto.getItemType());
        entity.setItemTypeId(dto.getItemTypeId());
        entity.setUomCode(dto.getUomCode());
        entity.setReceivedQty(dto.getReceivedQty());
        entity.setConsumedQty(dto.getConsumedQty());
        entity.setRemainingQty(dto.getRemainingQty());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SrModelItemInfoDTO mapToDTO(SrModelItemInfo entity) {
        SrModelItemInfoDTO dto = new SrModelItemInfoDTO();
        dto.setSrModelItemId(entity.getSrModelItemId());
        dto.setSrId(entity.getSrId());
        dto.setOrgId(entity.getOrgId());
        dto.setModelItemId(entity.getModelItemId());
        dto.setItemName(entity.getItemName());
        dto.setItemType(entity.getItemType());
        dto.setItemTypeId(entity.getItemTypeId());
        dto.setUomCode(entity.getUomCode());
        dto.setReceivedQty(entity.getReceivedQty());
        dto.setConsumedQty(entity.getConsumedQty());
        dto.setRemainingQty(entity.getRemainingQty());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}