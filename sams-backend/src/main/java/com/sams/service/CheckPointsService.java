package com.sams.service;

import com.sams.dto.CheckPointsDTO;
import java.util.List;

public interface CheckPointsService {
    CheckPointsDTO createCheckPoints(CheckPointsDTO dto);
    CheckPointsDTO getCheckPointsById(Long id);
    List<CheckPointsDTO> getAllCheckPointses();
    CheckPointsDTO updateCheckPoints(Long id, CheckPointsDTO dto);
    void deleteCheckPoints(Long id);
}