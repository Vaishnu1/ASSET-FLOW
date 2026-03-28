package com.sams.service;

import com.sams.dto.ParameterDTO;
import java.util.List;

public interface ParameterService {
    ParameterDTO createParameter(ParameterDTO dto);
    ParameterDTO getParameterById(Long id);
    List<ParameterDTO> getAllParameters();
    ParameterDTO updateParameter(Long id, ParameterDTO dto);
    void deleteParameter(Long id);
}