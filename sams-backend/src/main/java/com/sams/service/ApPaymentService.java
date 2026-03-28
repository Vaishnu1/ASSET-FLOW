package com.sams.service;

import com.sams.dto.ApPaymentDTO;
import java.util.List;

public interface ApPaymentService {
    ApPaymentDTO create(ApPaymentDTO dto);
    ApPaymentDTO getById(Long id);
    List<ApPaymentDTO> getAll();
    ApPaymentDTO update(Long id, ApPaymentDTO dto);
    void delete(Long id);
}