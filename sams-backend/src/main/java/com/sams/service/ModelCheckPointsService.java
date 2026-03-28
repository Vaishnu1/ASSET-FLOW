package com.sams.service;

import com.sams.dto.ModelCheckPointsDTO;
import java.util.List;

public interface ModelCheckPointsService {
    ModelCheckPointsDTO createModelCheckPoints(ModelCheckPointsDTO dto);
    ModelCheckPointsDTO getModelCheckPointsById(Long id);
    List<ModelCheckPointsDTO> getAllModelCheckPointses();
    ModelCheckPointsDTO updateModelCheckPoints(Long id, ModelCheckPointsDTO dto);
    void deleteModelCheckPoints(Long id);
}