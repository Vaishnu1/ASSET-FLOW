package com.sams.repository;

import com.sams.entity.PhysicalAuditVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhysicalAuditVerificationRepository extends JpaRepository<PhysicalAuditVerification, Long> {
}