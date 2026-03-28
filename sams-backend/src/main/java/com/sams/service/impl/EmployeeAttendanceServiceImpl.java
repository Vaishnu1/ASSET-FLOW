package com.sams.service.impl;

import com.sams.dto.EmployeeAttendanceDTO;
import com.sams.entity.EmployeeAttendance;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EmployeeAttendanceRepository;
import com.sams.service.EmployeeAttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeAttendanceServiceImpl implements EmployeeAttendanceService {

    private final EmployeeAttendanceRepository repository;

    @Override
    @Transactional
    public EmployeeAttendanceDTO create(EmployeeAttendanceDTO dto) {
        EmployeeAttendance entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EmployeeAttendanceDTO getById(Long id) {
        EmployeeAttendance entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmployeeAttendance not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EmployeeAttendanceDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmployeeAttendanceDTO update(Long id, EmployeeAttendanceDTO dto) {
        EmployeeAttendance entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmployeeAttendance not found with ID: " + id));
        EmployeeAttendance mapped = mapToEntity(dto);
        mapped.setEmployeeAttendanceId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        EmployeeAttendance entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmployeeAttendance not found with ID: " + id));
        repository.delete(entity);
    }

    private EmployeeAttendance mapToEntity(EmployeeAttendanceDTO dto) {
        EmployeeAttendance entity = new EmployeeAttendance();
        entity.setEmployeeAttendanceId(dto.getEmployeeAttendanceId());
        entity.setOrgId(dto.getOrgId());
        entity.setEmployeeId(dto.getEmployeeId());
        entity.setLatitude(dto.getLatitude());
        entity.setLongitude(dto.getLongitude());
        entity.setAddress(dto.getAddress());
        entity.setLoginTime(dto.getLoginTime());
        entity.setLogoutTime(dto.getLogoutTime());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private EmployeeAttendanceDTO mapToDTO(EmployeeAttendance entity) {
        EmployeeAttendanceDTO dto = new EmployeeAttendanceDTO();
        dto.setEmployeeAttendanceId(entity.getEmployeeAttendanceId());
        dto.setOrgId(entity.getOrgId());
        dto.setEmployeeId(entity.getEmployeeId());
        dto.setLatitude(entity.getLatitude());
        dto.setLongitude(entity.getLongitude());
        dto.setAddress(entity.getAddress());
        dto.setLoginTime(entity.getLoginTime());
        dto.setLogoutTime(entity.getLogoutTime());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}