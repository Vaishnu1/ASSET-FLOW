package com.sams.service;

import com.sams.dto.SmsInformationDTO;
import java.util.List;

public interface SmsInformationService {
    SmsInformationDTO create(SmsInformationDTO dto);
    SmsInformationDTO getById(Long id);
    List<SmsInformationDTO> getAll();
    SmsInformationDTO update(Long id, SmsInformationDTO dto);
    void delete(Long id);
}