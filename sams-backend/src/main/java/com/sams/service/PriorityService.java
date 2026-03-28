package com.sams.service;

import com.sams.dto.PriorityDTO;
import java.util.List;

public interface PriorityService {
    PriorityDTO createPriority(PriorityDTO dto);
    PriorityDTO getPriorityById(Long id);
    List<PriorityDTO> getAllPriorities();
    PriorityDTO updatePriority(Long id, PriorityDTO dto);
    void deletePriority(Long id);
}