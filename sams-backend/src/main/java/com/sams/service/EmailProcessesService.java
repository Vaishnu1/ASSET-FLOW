package com.sams.service;

import com.sams.dto.EmailProcessesDTO;
import java.util.List;

public interface EmailProcessesService {
    EmailProcessesDTO create(EmailProcessesDTO dto);
    EmailProcessesDTO getById(Long id);
    List<EmailProcessesDTO> getAll();
    EmailProcessesDTO update(Long id, EmailProcessesDTO dto);
    void delete(Long id);
}