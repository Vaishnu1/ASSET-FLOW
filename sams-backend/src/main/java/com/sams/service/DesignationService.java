package com.sams.service;

import com.sams.dto.DesignationDTO;
import java.util.List;

public interface DesignationService {
    DesignationDTO createDesignation(DesignationDTO dto);
    DesignationDTO getDesignationById(Long id);
    List<DesignationDTO> getAllDesignations();
    DesignationDTO updateDesignation(Long id, DesignationDTO dto);
    void deleteDesignation(Long id);
}