package com.sams.service;

import com.sams.dto.EmailReminderScheduleDtlDTO;
import java.util.List;

public interface EmailReminderScheduleDtlService {
    EmailReminderScheduleDtlDTO create(EmailReminderScheduleDtlDTO dto);
    EmailReminderScheduleDtlDTO getById(Long id);
    List<EmailReminderScheduleDtlDTO> getAll();
    EmailReminderScheduleDtlDTO update(Long id, EmailReminderScheduleDtlDTO dto);
    void delete(Long id);
}