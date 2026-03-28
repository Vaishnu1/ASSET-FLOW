package com.sams.service;

import com.sams.dto.SrTrainingEmployeeDTO;
import java.util.List;

public interface SrTrainingEmployeeService {
    SrTrainingEmployeeDTO create(SrTrainingEmployeeDTO dto);
    SrTrainingEmployeeDTO getById(Long id);
    List<SrTrainingEmployeeDTO> getAll();
    SrTrainingEmployeeDTO update(Long id, SrTrainingEmployeeDTO dto);
    void delete(Long id);
}