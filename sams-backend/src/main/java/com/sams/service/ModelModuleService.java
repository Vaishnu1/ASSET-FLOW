package com.sams.service;

import com.sams.dto.ModelModuleDTO;
import java.util.List;

public interface ModelModuleService {
    ModelModuleDTO create(ModelModuleDTO dto);
    ModelModuleDTO getById(Long id);
    List<ModelModuleDTO> getAll();
    ModelModuleDTO update(Long id, ModelModuleDTO dto);
    void delete(Long id);
}