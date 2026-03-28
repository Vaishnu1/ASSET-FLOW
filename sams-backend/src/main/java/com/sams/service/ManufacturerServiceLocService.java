package com.sams.service;

import com.sams.dto.ManufacturerServiceLocDTO;
import java.util.List;

public interface ManufacturerServiceLocService {
    ManufacturerServiceLocDTO create(ManufacturerServiceLocDTO dto);
    ManufacturerServiceLocDTO getById(Long id);
    List<ManufacturerServiceLocDTO> getAll();
    ManufacturerServiceLocDTO update(Long id, ManufacturerServiceLocDTO dto);
    void delete(Long id);
}