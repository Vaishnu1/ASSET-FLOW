package com.sams.service.impl;

import com.sams.dto.SrTrainingEmployeeDTO;
import com.sams.entity.SrTrainingEmployee;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrTrainingEmployeeRepository;
import com.sams.service.SrTrainingEmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrTrainingEmployeeServiceImpl implements SrTrainingEmployeeService {

    private final SrTrainingEmployeeRepository repository;

    @Override
    @Transactional
    public SrTrainingEmployeeDTO create(SrTrainingEmployeeDTO dto) {
        SrTrainingEmployee entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrTrainingEmployeeDTO getById(Long id) {
        SrTrainingEmployee entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrTrainingEmployee not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrTrainingEmployeeDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrTrainingEmployeeDTO update(Long id, SrTrainingEmployeeDTO dto) {
        SrTrainingEmployee entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrTrainingEmployee not found with ID: " + id));
        SrTrainingEmployee mapped = mapToEntity(dto);
        mapped.setSrTrainingEmpId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrTrainingEmployee entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrTrainingEmployee not found with ID: " + id));
        repository.delete(entity);
    }

    private SrTrainingEmployee mapToEntity(SrTrainingEmployeeDTO dto) {
        SrTrainingEmployee entity = new SrTrainingEmployee();
        entity.setSrTrainingEmpId(dto.getSrTrainingEmpId());
        entity.setOrgId(dto.getOrgId());
        entity.setSrId(dto.getSrId());
        entity.setSrTrainingId(dto.getSrTrainingId());
        entity.setEmployeeId(dto.getEmployeeId());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SrTrainingEmployeeDTO mapToDTO(SrTrainingEmployee entity) {
        SrTrainingEmployeeDTO dto = new SrTrainingEmployeeDTO();
        dto.setSrTrainingEmpId(entity.getSrTrainingEmpId());
        dto.setOrgId(entity.getOrgId());
        dto.setSrId(entity.getSrId());
        dto.setSrTrainingId(entity.getSrTrainingId());
        dto.setEmployeeId(entity.getEmployeeId());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}