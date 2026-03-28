package com.sams.service;

import com.sams.dto.RfqMainDTO;
import java.util.List;

public interface RfqMainService {
    RfqMainDTO create(RfqMainDTO dto);
    RfqMainDTO getById(Long id);
    List<RfqMainDTO> getAll();
    RfqMainDTO update(Long id, RfqMainDTO dto);
    void delete(Long id);
}