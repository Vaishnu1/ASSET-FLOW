package com.sams.service;

import com.sams.dto.SrTrainingDocDTO;
import java.util.List;

public interface SrTrainingDocService {
    SrTrainingDocDTO create(SrTrainingDocDTO dto);
    SrTrainingDocDTO getById(Long id);
    List<SrTrainingDocDTO> getAll();
    SrTrainingDocDTO update(Long id, SrTrainingDocDTO dto);
    void delete(Long id);
}