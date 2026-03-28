package com.sams.service.impl;

import com.sams.dto.SrTrainingDTO;
import com.sams.entity.SrTraining;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrTrainingRepository;
import com.sams.service.SrTrainingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrTrainingServiceImpl implements SrTrainingService {

    private final SrTrainingRepository repository;

    @Override
    @Transactional
    public SrTrainingDTO create(SrTrainingDTO dto) {
        SrTraining entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrTrainingDTO getById(Long id) {
        SrTraining entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrTraining not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrTrainingDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrTrainingDTO update(Long id, SrTrainingDTO dto) {
        SrTraining entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrTraining not found with ID: " + id));
        SrTraining mapped = mapToEntity(dto);
        mapped.setSrTrainingId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrTraining entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrTraining not found with ID: " + id));
        repository.delete(entity);
    }

    private SrTraining mapToEntity(SrTrainingDTO dto) {
        SrTraining entity = new SrTraining();
        entity.setSrTrainingId(dto.getSrTrainingId());
        entity.setOrgId(dto.getOrgId());
        entity.setSrId(dto.getSrId());
        entity.setTrainingTypeId(dto.getTrainingTypeId());
        entity.setTrainingTypeName(dto.getTrainingTypeName());
        entity.setTrainingDt(dto.getTrainingDt());
        entity.setTraineerDesc(dto.getTraineerDesc());
        entity.setTraineerName(dto.getTraineerName());
        entity.setTraineerContactNo(dto.getTraineerContactNo());
        entity.setTraineerEmailId(dto.getTraineerEmailId());
        entity.setTrainingCompany(dto.getTrainingCompany());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SrTrainingDTO mapToDTO(SrTraining entity) {
        SrTrainingDTO dto = new SrTrainingDTO();
        dto.setSrTrainingId(entity.getSrTrainingId());
        dto.setOrgId(entity.getOrgId());
        dto.setSrId(entity.getSrId());
        dto.setTrainingTypeId(entity.getTrainingTypeId());
        dto.setTrainingTypeName(entity.getTrainingTypeName());
        dto.setTrainingDt(entity.getTrainingDt());
        dto.setTraineerDesc(entity.getTraineerDesc());
        dto.setTraineerName(entity.getTraineerName());
        dto.setTraineerContactNo(entity.getTraineerContactNo());
        dto.setTraineerEmailId(entity.getTraineerEmailId());
        dto.setTrainingCompany(entity.getTrainingCompany());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}