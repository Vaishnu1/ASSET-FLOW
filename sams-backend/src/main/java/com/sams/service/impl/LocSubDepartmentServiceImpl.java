package com.sams.service.impl;

import com.sams.dto.LocSubDepartmentDTO;
import com.sams.entity.LocSubDepartment;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.LocSubDepartmentRepository;
import com.sams.service.LocSubDepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocSubDepartmentServiceImpl implements LocSubDepartmentService {

    private final LocSubDepartmentRepository repository;

    @Override
    @Transactional
    public LocSubDepartmentDTO create(LocSubDepartmentDTO dto) {
        LocSubDepartment entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public LocSubDepartmentDTO getById(Long id) {
        LocSubDepartment entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocSubDepartment not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<LocSubDepartmentDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LocSubDepartmentDTO update(Long id, LocSubDepartmentDTO dto) {
        LocSubDepartment entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocSubDepartment not found with ID: " + id));
        LocSubDepartment mapped = mapToEntity(dto);
        mapped.setLocSubDeptId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        LocSubDepartment entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocSubDepartment not found with ID: " + id));
        repository.delete(entity);
    }

    private LocSubDepartment mapToEntity(LocSubDepartmentDTO dto) {
        LocSubDepartment entity = new LocSubDepartment();
        entity.setLocSubDeptId(dto.getLocSubDeptId());
        entity.setLocSubDeptName(dto.getLocSubDeptName());
        entity.setSubDeptId(dto.getSubDeptId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocDepartmentId(dto.getLocDepartmentId());
        entity.setBlockId(dto.getBlockId());
        entity.setFloorId(dto.getFloorId());
        entity.setRoomId(dto.getRoomId());
        entity.setSegmentId(dto.getSegmentId());
        entity.setInchargeId(dto.getInchargeId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private LocSubDepartmentDTO mapToDTO(LocSubDepartment entity) {
        LocSubDepartmentDTO dto = new LocSubDepartmentDTO();
        dto.setLocSubDeptId(entity.getLocSubDeptId());
        dto.setLocSubDeptName(entity.getLocSubDeptName());
        dto.setSubDeptId(entity.getSubDeptId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocDepartmentId(entity.getLocDepartmentId());
        dto.setBlockId(entity.getBlockId());
        dto.setFloorId(entity.getFloorId());
        dto.setRoomId(entity.getRoomId());
        dto.setSegmentId(entity.getSegmentId());
        dto.setInchargeId(entity.getInchargeId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}