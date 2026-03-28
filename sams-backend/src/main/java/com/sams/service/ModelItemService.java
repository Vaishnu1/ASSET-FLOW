package com.sams.service;

import com.sams.dto.ModelItemDTO;
import java.util.List;

public interface ModelItemService {
    ModelItemDTO create(ModelItemDTO dto);
    ModelItemDTO getById(Long id);
    List<ModelItemDTO> getAll();
    ModelItemDTO update(Long id, ModelItemDTO dto);
    void delete(Long id);
}