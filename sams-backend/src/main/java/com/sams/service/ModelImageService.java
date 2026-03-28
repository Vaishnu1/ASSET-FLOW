package com.sams.service;

import com.sams.dto.ModelImageDTO;
import java.util.List;

public interface ModelImageService {
    ModelImageDTO create(ModelImageDTO dto);
    ModelImageDTO getById(Long id);
    List<ModelImageDTO> getAll();
    ModelImageDTO update(Long id, ModelImageDTO dto);
    void delete(Long id);
}