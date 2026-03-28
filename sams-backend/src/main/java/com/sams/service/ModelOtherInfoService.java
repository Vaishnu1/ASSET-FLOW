package com.sams.service;

import com.sams.dto.ModelOtherInfoDTO;
import java.util.List;

public interface ModelOtherInfoService {
    ModelOtherInfoDTO create(ModelOtherInfoDTO dto);
    ModelOtherInfoDTO getById(Long id);
    List<ModelOtherInfoDTO> getAll();
    ModelOtherInfoDTO update(Long id, ModelOtherInfoDTO dto);
    void delete(Long id);
}