package com.sams.service;

import com.sams.dto.EmailReminderScheduleHdrDTO;
import java.util.List;

public interface EmailReminderScheduleHdrService {
    EmailReminderScheduleHdrDTO create(EmailReminderScheduleHdrDTO dto);
    EmailReminderScheduleHdrDTO getById(Long id);
    List<EmailReminderScheduleHdrDTO> getAll();
    EmailReminderScheduleHdrDTO update(Long id, EmailReminderScheduleHdrDTO dto);
    void delete(Long id);
}