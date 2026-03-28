package com.sams.service.impl;

import com.sams.dto.CheckPointsDTO;
import com.sams.entity.CheckPoints;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.CheckPointsRepository;
import com.sams.service.CheckPointsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CheckPointsServiceImpl implements CheckPointsService {

    private final CheckPointsRepository repository;

    @Override
    @Transactional
    public CheckPointsDTO createCheckPoints(CheckPointsDTO dto) {
        CheckPoints entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public CheckPointsDTO getCheckPointsById(Long id) {
        CheckPoints entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CheckPoints not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<CheckPointsDTO> getAllCheckPointses() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CheckPointsDTO updateCheckPoints(Long id, CheckPointsDTO dto) {
        CheckPoints entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CheckPoints not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        CheckPoints mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteCheckPoints(Long id) {
        CheckPoints entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CheckPoints not found with ID: " + id));
        repository.delete(entity);
    }

    private CheckPoints mapToEntity(CheckPointsDTO dto) {
        CheckPoints entity = new CheckPoints();
        entity.setCheckPointsId(dto.getCheckPointsId());
        entity.setSrId(dto.getSrId());
        entity.setModelId(dto.getModelId());
        entity.setModelCheckPointsId(dto.getModelCheckPointsId());
        entity.setCheckPointName(dto.getCheckPointName());
        entity.setUom(dto.getUom());
        entity.setFrequency(dto.getFrequency());
        entity.setDuration(dto.getDuration());
        entity.setResult(dto.getResult());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        return entity;
    }

    private CheckPointsDTO mapToDTO(CheckPoints entity) {
        CheckPointsDTO dto = new CheckPointsDTO();
        dto.setId(entity.getId());
        dto.setCheckPointsId(entity.getCheckPointsId());
        dto.setSrId(entity.getSrId());
        dto.setModelId(entity.getModelId());
        dto.setModelCheckPointsId(entity.getModelCheckPointsId());
        dto.setCheckPointName(entity.getCheckPointName());
        dto.setUom(entity.getUom());
        dto.setFrequency(entity.getFrequency());
        dto.setDuration(entity.getDuration());
        dto.setResult(entity.getResult());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        return dto;
    }
}