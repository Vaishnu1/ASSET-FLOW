package com.sams.service;

import com.sams.dto.ReferenceEmailServiceDbDTO;
import java.util.List;

public interface ReferenceEmailServiceDbService {
    ReferenceEmailServiceDbDTO create(ReferenceEmailServiceDbDTO dto);
    ReferenceEmailServiceDbDTO getById(Long id);
    List<ReferenceEmailServiceDbDTO> getAll();
    ReferenceEmailServiceDbDTO update(Long id, ReferenceEmailServiceDbDTO dto);
    void delete(Long id);
}