package com.sams.service.impl;

import com.sams.dto.EmpLocDTO;
import com.sams.entity.EmpLoc;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EmpLocRepository;
import com.sams.service.EmpLocService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmpLocServiceImpl implements EmpLocService {

    private final EmpLocRepository repository;

    @Override
    @Transactional
    public EmpLocDTO create(EmpLocDTO dto) {
        EmpLoc entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EmpLocDTO getById(Long id) {
        EmpLoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmpLoc not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EmpLocDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmpLocDTO update(Long id, EmpLocDTO dto) {
        EmpLoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmpLoc not found with ID: " + id));
        EmpLoc mapped = mapToEntity(dto);
        mapped.setEmpLocId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        EmpLoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmpLoc not found with ID: " + id));
        repository.delete(entity);
    }

    private EmpLoc mapToEntity(EmpLocDTO dto) {
        EmpLoc entity = new EmpLoc();
        entity.setEmpLocId(dto.getEmpLocId());
        entity.setEmployeeId(dto.getEmployeeId());
        entity.setEmployeeCode(dto.getEmployeeCode());
        entity.setAccessLocId(dto.getAccessLocId());
        entity.setAccessLocName(dto.getAccessLocName());
        entity.setDefaultLocation(dto.getDefaultLocation());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private EmpLocDTO mapToDTO(EmpLoc entity) {
        EmpLocDTO dto = new EmpLocDTO();
        dto.setEmpLocId(entity.getEmpLocId());
        dto.setEmployeeId(entity.getEmployeeId());
        dto.setEmployeeCode(entity.getEmployeeCode());
        dto.setAccessLocId(entity.getAccessLocId());
        dto.setAccessLocName(entity.getAccessLocName());
        dto.setDefaultLocation(entity.getDefaultLocation());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}