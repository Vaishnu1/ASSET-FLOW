package com.sams.service;

import com.sams.dto.SmsMessageDTO;
import java.util.List;

public interface SmsMessageService {
    SmsMessageDTO create(SmsMessageDTO dto);
    SmsMessageDTO getById(Long id);
    List<SmsMessageDTO> getAll();
    SmsMessageDTO update(Long id, SmsMessageDTO dto);
    void delete(Long id);
}