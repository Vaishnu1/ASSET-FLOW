package com.sams.service;

import com.sams.dto.EmailInformationDTO;
import java.util.List;

public interface EmailInformationService {
    EmailInformationDTO create(EmailInformationDTO dto);
    EmailInformationDTO getById(Long id);
    List<EmailInformationDTO> getAll();
    EmailInformationDTO update(Long id, EmailInformationDTO dto);
    void delete(Long id);
}