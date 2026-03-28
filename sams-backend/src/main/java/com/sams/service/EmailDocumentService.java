package com.sams.service;

import com.sams.dto.EmailDocumentDTO;
import java.util.List;

public interface EmailDocumentService {
    EmailDocumentDTO create(EmailDocumentDTO dto);
    EmailDocumentDTO getById(Long id);
    List<EmailDocumentDTO> getAll();
    EmailDocumentDTO update(Long id, EmailDocumentDTO dto);
    void delete(Long id);
}