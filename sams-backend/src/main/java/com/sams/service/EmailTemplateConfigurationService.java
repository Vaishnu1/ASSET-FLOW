package com.sams.service;

import com.sams.dto.EmailTemplateConfigurationDTO;
import java.util.List;

public interface EmailTemplateConfigurationService {
    EmailTemplateConfigurationDTO create(EmailTemplateConfigurationDTO dto);
    EmailTemplateConfigurationDTO getById(Long id);
    List<EmailTemplateConfigurationDTO> getAll();
    EmailTemplateConfigurationDTO update(Long id, EmailTemplateConfigurationDTO dto);
    void delete(Long id);
}