package com.sams.service;

import com.sams.dto.ModelSelfCheckDTO;
import java.util.List;

public interface ModelSelfCheckService {
    ModelSelfCheckDTO create(ModelSelfCheckDTO dto);
    ModelSelfCheckDTO getById(Long id);
    List<ModelSelfCheckDTO> getAll();
    ModelSelfCheckDTO update(Long id, ModelSelfCheckDTO dto);
    void delete(Long id);
}