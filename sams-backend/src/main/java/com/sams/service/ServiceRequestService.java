package com.sams.service;

import com.sams.dto.ServiceRequestDTO;
import java.util.List;

public interface ServiceRequestService {
    ServiceRequestDTO create(ServiceRequestDTO dto);
    ServiceRequestDTO getById(Long id);
    List<ServiceRequestDTO> getAll();
    ServiceRequestDTO update(Long id, ServiceRequestDTO dto);
    void delete(Long id);
}