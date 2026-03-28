package com.sams.service;

import com.sams.dto.NumberControlCdDTO;
import java.util.List;

public interface NumberControlCdService {
    NumberControlCdDTO create(NumberControlCdDTO dto);
    NumberControlCdDTO getById(Long id);
    List<NumberControlCdDTO> getAll();
    NumberControlCdDTO update(Long id, NumberControlCdDTO dto);
    void delete(Long id);
}