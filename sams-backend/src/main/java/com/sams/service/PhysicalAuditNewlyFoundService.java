package com.sams.service;

import com.sams.dto.PhysicalAuditNewlyFoundDTO;
import java.util.List;

public interface PhysicalAuditNewlyFoundService {
    PhysicalAuditNewlyFoundDTO create(PhysicalAuditNewlyFoundDTO dto);
    PhysicalAuditNewlyFoundDTO getById(Long id);
    List<PhysicalAuditNewlyFoundDTO> getAll();
    PhysicalAuditNewlyFoundDTO update(Long id, PhysicalAuditNewlyFoundDTO dto);
    void delete(Long id);
}