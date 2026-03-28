package com.sams.service;

import com.sams.dto.SrActivityCorrectActionsDTO;
import java.util.List;

public interface SrActivityCorrectActionsService {
    SrActivityCorrectActionsDTO create(SrActivityCorrectActionsDTO dto);
    SrActivityCorrectActionsDTO getById(Long id);
    List<SrActivityCorrectActionsDTO> getAll();
    SrActivityCorrectActionsDTO update(Long id, SrActivityCorrectActionsDTO dto);
    void delete(Long id);
}