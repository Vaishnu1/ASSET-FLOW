package com.sams.service;

import com.sams.dto.ModelTechnicalSpecialistDTO;
import java.util.List;

public interface ModelTechnicalSpecialistService {
    ModelTechnicalSpecialistDTO create(ModelTechnicalSpecialistDTO dto);
    ModelTechnicalSpecialistDTO getById(Long id);
    List<ModelTechnicalSpecialistDTO> getAll();
    ModelTechnicalSpecialistDTO update(Long id, ModelTechnicalSpecialistDTO dto);
    void delete(Long id);
}