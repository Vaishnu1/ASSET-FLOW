package com.sams.service;

import com.sams.dto.MaintScheduleDtlDTO;
import java.util.List;

public interface MaintScheduleDtlService {
    MaintScheduleDtlDTO create(MaintScheduleDtlDTO dto);
    MaintScheduleDtlDTO getById(Long id);
    List<MaintScheduleDtlDTO> getAll();
    MaintScheduleDtlDTO update(Long id, MaintScheduleDtlDTO dto);
    void delete(Long id);
}