package com.sams.service;

import com.sams.dto.EmailMessageDTO;
import java.util.List;

public interface EmailMessageService {
    EmailMessageDTO create(EmailMessageDTO dto);
    EmailMessageDTO getById(Long id);
    List<EmailMessageDTO> getAll();
    EmailMessageDTO update(Long id, EmailMessageDTO dto);
    void delete(Long id);
}