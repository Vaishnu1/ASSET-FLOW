package com.sams.service;

import com.sams.dto.SmsMessageHdrDTO;
import java.util.List;

public interface SmsMessageHdrService {
    SmsMessageHdrDTO create(SmsMessageHdrDTO dto);
    SmsMessageHdrDTO getById(Long id);
    List<SmsMessageHdrDTO> getAll();
    SmsMessageHdrDTO update(Long id, SmsMessageHdrDTO dto);
    void delete(Long id);
}