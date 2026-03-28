package com.sams.service;

import com.sams.dto.ModelDTO;
import java.util.List;

public interface ModelService {
    ModelDTO create(ModelDTO dto);
    ModelDTO getById(Long id);
    List<ModelDTO> getAll();
    ModelDTO update(Long id, ModelDTO dto);
    void delete(Long id);
}