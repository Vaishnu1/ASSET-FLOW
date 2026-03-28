package com.sams.service;

import com.sams.dto.ModelDocDTO;
import java.util.List;

public interface ModelDocService {
    ModelDocDTO create(ModelDocDTO dto);
    ModelDocDTO getById(Long id);
    List<ModelDocDTO> getAll();
    ModelDocDTO update(Long id, ModelDocDTO dto);
    void delete(Long id);
}