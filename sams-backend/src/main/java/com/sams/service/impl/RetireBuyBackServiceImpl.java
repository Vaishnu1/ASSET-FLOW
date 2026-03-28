package com.sams.service.impl;

import com.sams.dto.RetireBuyBackDTO;
import com.sams.entity.RetireBuyBack;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.RetireBuyBackRepository;
import com.sams.service.RetireBuyBackService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RetireBuyBackServiceImpl implements RetireBuyBackService {

    private final RetireBuyBackRepository repository;

    @Override
    @Transactional
    public RetireBuyBackDTO create(RetireBuyBackDTO dto) {
        RetireBuyBack entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public RetireBuyBackDTO getById(Long id) {
        RetireBuyBack entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RetireBuyBack not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<RetireBuyBackDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RetireBuyBackDTO update(Long id, RetireBuyBackDTO dto) {
        RetireBuyBack entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RetireBuyBack not found with ID: " + id));
        RetireBuyBack mapped = mapToEntity(dto);
        mapped.setRetireBuyBackId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        RetireBuyBack entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RetireBuyBack not found with ID: " + id));
        repository.delete(entity);
    }

    private RetireBuyBack mapToEntity(RetireBuyBackDTO dto) {
        RetireBuyBack entity = new RetireBuyBack();
        entity.setRetireBuyBackId(dto.getRetireBuyBackId());
        entity.setOrgId(dto.getOrgId());
        entity.setAssetRetireId(dto.getAssetRetireId());
        entity.setBuyBackModelId(dto.getBuyBackModelId());
        entity.setBuyBackRemarks(dto.getBuyBackRemarks());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private RetireBuyBackDTO mapToDTO(RetireBuyBack entity) {
        RetireBuyBackDTO dto = new RetireBuyBackDTO();
        dto.setRetireBuyBackId(entity.getRetireBuyBackId());
        dto.setOrgId(entity.getOrgId());
        dto.setAssetRetireId(entity.getAssetRetireId());
        dto.setBuyBackModelId(entity.getBuyBackModelId());
        dto.setBuyBackRemarks(entity.getBuyBackRemarks());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}