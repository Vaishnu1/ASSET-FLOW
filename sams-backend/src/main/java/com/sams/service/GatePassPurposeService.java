package com.sams.service;

import com.sams.dto.GatePassPurposeDTO;
import java.util.List;

public interface GatePassPurposeService {
    GatePassPurposeDTO create(GatePassPurposeDTO dto);
    GatePassPurposeDTO getById(Long id);
    List<GatePassPurposeDTO> getAll();
    GatePassPurposeDTO update(Long id, GatePassPurposeDTO dto);
    void delete(Long id);
}