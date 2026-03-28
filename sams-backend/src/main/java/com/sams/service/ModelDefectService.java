package com.sams.service;

import com.sams.dto.ModelDefectDTO;
import java.util.List;

public interface ModelDefectService {
    ModelDefectDTO create(ModelDefectDTO dto);
    ModelDefectDTO getById(Long id);
    List<ModelDefectDTO> getAll();
    ModelDefectDTO update(Long id, ModelDefectDTO dto);
    void delete(Long id);
}