package com.sams.service;

import com.sams.dto.NumberControlDTO;
import java.util.List;

public interface NumberControlService {
    NumberControlDTO create(NumberControlDTO dto);
    NumberControlDTO getById(Long id);
    List<NumberControlDTO> getAll();
    NumberControlDTO update(Long id, NumberControlDTO dto);
    void delete(Long id);
}