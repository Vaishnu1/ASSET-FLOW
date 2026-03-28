package com.sams.service;

import com.sams.dto.EmailVariableConfigDTO;
import java.util.List;

public interface EmailVariableConfigService {
    EmailVariableConfigDTO create(EmailVariableConfigDTO dto);
    EmailVariableConfigDTO getById(Long id);
    List<EmailVariableConfigDTO> getAll();
    EmailVariableConfigDTO update(Long id, EmailVariableConfigDTO dto);
    void delete(Long id);
}