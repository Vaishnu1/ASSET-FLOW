package com.sams.service;

import com.sams.dto.EmailModulesDTO;
import java.util.List;

public interface EmailModulesService {
    EmailModulesDTO create(EmailModulesDTO dto);
    EmailModulesDTO getById(Long id);
    List<EmailModulesDTO> getAll();
    EmailModulesDTO update(Long id, EmailModulesDTO dto);
    void delete(Long id);
}