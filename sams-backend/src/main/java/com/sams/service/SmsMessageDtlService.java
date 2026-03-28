package com.sams.service;

import com.sams.dto.SmsMessageDtlDTO;
import java.util.List;

public interface SmsMessageDtlService {
    SmsMessageDtlDTO create(SmsMessageDtlDTO dto);
    SmsMessageDtlDTO getById(Long id);
    List<SmsMessageDtlDTO> getAll();
    SmsMessageDtlDTO update(Long id, SmsMessageDtlDTO dto);
    void delete(Long id);
}