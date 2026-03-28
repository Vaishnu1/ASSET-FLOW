package com.sams.service;

import com.sams.dto.ModelChildDTO;
import java.util.List;

public interface ModelChildService {
    ModelChildDTO create(ModelChildDTO dto);
    ModelChildDTO getById(Long id);
    List<ModelChildDTO> getAll();
    ModelChildDTO update(Long id, ModelChildDTO dto);
    void delete(Long id);
}