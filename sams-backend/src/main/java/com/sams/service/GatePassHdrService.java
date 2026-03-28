package com.sams.service;

import com.sams.dto.GatePassHdrDTO;
import java.util.List;

public interface GatePassHdrService {
    GatePassHdrDTO create(GatePassHdrDTO dto);
    GatePassHdrDTO getById(Long id);
    List<GatePassHdrDTO> getAll();
    GatePassHdrDTO update(Long id, GatePassHdrDTO dto);
    void delete(Long id);
}