package com.sams.service;

import com.sams.dto.LocRegistrationDTO;
import java.util.List;

public interface LocRegistrationService {
    LocRegistrationDTO create(LocRegistrationDTO dto);
    LocRegistrationDTO getById(Long id);
    List<LocRegistrationDTO> getAll();
    LocRegistrationDTO update(Long id, LocRegistrationDTO dto);
    void delete(Long id);
}