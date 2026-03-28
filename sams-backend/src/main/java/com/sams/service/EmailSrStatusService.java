package com.sams.service;

import com.sams.dto.EmailSrStatusDTO;
import java.util.List;

public interface EmailSrStatusService {
    EmailSrStatusDTO create(EmailSrStatusDTO dto);
    EmailSrStatusDTO getById(Long id);
    List<EmailSrStatusDTO> getAll();
    EmailSrStatusDTO update(Long id, EmailSrStatusDTO dto);
    void delete(Long id);
}