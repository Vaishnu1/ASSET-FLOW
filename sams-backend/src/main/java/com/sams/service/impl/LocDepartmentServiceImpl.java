package com.sams.service.impl;

import com.sams.dto.LocDepartmentDTO;
import com.sams.entity.LocDepartment;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.LocDepartmentRepository;
import com.sams.service.LocDepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocDepartmentServiceImpl implements LocDepartmentService {

    private final LocDepartmentRepository repository;

    @Override
    @Transactional
    public LocDepartmentDTO create(LocDepartmentDTO dto) {
        LocDepartment entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public LocDepartmentDTO getById(Long id) {
        LocDepartment entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocDepartment not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<LocDepartmentDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LocDepartmentDTO update(Long id, LocDepartmentDTO dto) {
        LocDepartment entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocDepartment not found with ID: " + id));
        LocDepartment mapped = mapToEntity(dto);
        mapped.setLocDepartmentId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        LocDepartment entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocDepartment not found with ID: " + id));
        repository.delete(entity);
    }

    private LocDepartment mapToEntity(LocDepartmentDTO dto) {
        LocDepartment entity = new LocDepartment();
        entity.setLocDepartmentId(dto.getLocDepartmentId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setDepartmentId(dto.getDepartmentId());
        entity.setDepartmentName(dto.getDepartmentName());
        entity.setActive(dto.getActive());
        entity.setDesignation(dto.getDesignation());
        entity.setInchargeName(dto.getInchargeName());
        entity.setDesignationId(dto.getDesignationId());
        entity.setInchargeId(dto.getInchargeId());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setBlockId(dto.getBlockId());
        entity.setFloorId(dto.getFloorId());
        entity.setRoomId(dto.getRoomId());
        entity.setSegmentId(dto.getSegmentId());
        return entity;
    }

    private LocDepartmentDTO mapToDTO(LocDepartment entity) {
        LocDepartmentDTO dto = new LocDepartmentDTO();
        dto.setLocDepartmentId(entity.getLocDepartmentId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setDepartmentId(entity.getDepartmentId());
        dto.setDepartmentName(entity.getDepartmentName());
        dto.setActive(entity.getActive());
        dto.setDesignation(entity.getDesignation());
        dto.setInchargeName(entity.getInchargeName());
        dto.setDesignationId(entity.getDesignationId());
        dto.setInchargeId(entity.getInchargeId());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setBlockId(entity.getBlockId());
        dto.setFloorId(entity.getFloorId());
        dto.setRoomId(entity.getRoomId());
        dto.setSegmentId(entity.getSegmentId());
        return dto;
    }
}