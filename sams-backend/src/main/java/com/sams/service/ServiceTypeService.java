package com.sams.service;

import com.sams.dto.ServiceTypeDTO;
import java.util.List;

public interface ServiceTypeService {
    ServiceTypeDTO create(ServiceTypeDTO dto);
    ServiceTypeDTO getById(Long id);
    List<ServiceTypeDTO> getAll();
    ServiceTypeDTO update(Long id, ServiceTypeDTO dto);
    void delete(Long id);
}