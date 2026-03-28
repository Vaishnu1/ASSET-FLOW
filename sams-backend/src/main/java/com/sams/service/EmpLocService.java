package com.sams.service;

import com.sams.dto.EmpLocDTO;
import java.util.List;

public interface EmpLocService {
    EmpLocDTO create(EmpLocDTO dto);
    EmpLocDTO getById(Long id);
    List<EmpLocDTO> getAll();
    EmpLocDTO update(Long id, EmpLocDTO dto);
    void delete(Long id);
}