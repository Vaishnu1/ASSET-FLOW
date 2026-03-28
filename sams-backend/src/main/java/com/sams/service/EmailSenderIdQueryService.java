package com.sams.service;

import com.sams.dto.EmailSenderIdQueryDTO;
import java.util.List;

public interface EmailSenderIdQueryService {
    EmailSenderIdQueryDTO create(EmailSenderIdQueryDTO dto);
    EmailSenderIdQueryDTO getById(Long id);
    List<EmailSenderIdQueryDTO> getAll();
    EmailSenderIdQueryDTO update(Long id, EmailSenderIdQueryDTO dto);
    void delete(Long id);
}