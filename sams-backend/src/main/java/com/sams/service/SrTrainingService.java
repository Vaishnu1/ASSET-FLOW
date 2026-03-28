package com.sams.service;

import com.sams.dto.SrTrainingDTO;
import java.util.List;

public interface SrTrainingService {
    SrTrainingDTO create(SrTrainingDTO dto);
    SrTrainingDTO getById(Long id);
    List<SrTrainingDTO> getAll();
    SrTrainingDTO update(Long id, SrTrainingDTO dto);
    void delete(Long id);
}