package com.sams.service;

import com.sams.dto.ParameterTypeDTO;
import java.util.List;

public interface ParameterTypeService {
    ParameterTypeDTO createParameterType(ParameterTypeDTO dto);
    ParameterTypeDTO getParameterTypeById(Long id);
    List<ParameterTypeDTO> getAllParameterTypes();
    ParameterTypeDTO updateParameterType(Long id, ParameterTypeDTO dto);
    void deleteParameterType(Long id);
}