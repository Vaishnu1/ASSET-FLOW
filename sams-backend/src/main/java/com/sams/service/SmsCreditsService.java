package com.sams.service;

import com.sams.dto.SmsCreditsDTO;
import java.util.List;

public interface SmsCreditsService {
    SmsCreditsDTO create(SmsCreditsDTO dto);
    SmsCreditsDTO getById(Long id);
    List<SmsCreditsDTO> getAll();
    SmsCreditsDTO update(Long id, SmsCreditsDTO dto);
    void delete(Long id);
}