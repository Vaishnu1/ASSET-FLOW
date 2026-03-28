package com.sams.service;

import com.sams.dto.EmployeeAttendanceDTO;
import java.util.List;

public interface EmployeeAttendanceService {
    EmployeeAttendanceDTO create(EmployeeAttendanceDTO dto);
    EmployeeAttendanceDTO getById(Long id);
    List<EmployeeAttendanceDTO> getAll();
    EmployeeAttendanceDTO update(Long id, EmployeeAttendanceDTO dto);
    void delete(Long id);
}