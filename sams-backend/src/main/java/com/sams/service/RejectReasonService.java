package com.sams.service;

import com.sams.dto.RejectReasonDTO;
import java.util.List;

public interface RejectReasonService {
    RejectReasonDTO create(RejectReasonDTO dto);
    RejectReasonDTO getById(Long id);
    List<RejectReasonDTO> getAll();
    RejectReasonDTO update(Long id, RejectReasonDTO dto);
    void delete(Long id);
}