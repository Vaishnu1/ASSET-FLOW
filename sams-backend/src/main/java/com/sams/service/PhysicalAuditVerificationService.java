package com.sams.service;

import com.sams.dto.PhysicalAuditVerificationDTO;
import java.util.List;

public interface PhysicalAuditVerificationService {
    PhysicalAuditVerificationDTO create(PhysicalAuditVerificationDTO dto);
    PhysicalAuditVerificationDTO getById(Long id);
    List<PhysicalAuditVerificationDTO> getAll();
    PhysicalAuditVerificationDTO update(Long id, PhysicalAuditVerificationDTO dto);
    void delete(Long id);
}