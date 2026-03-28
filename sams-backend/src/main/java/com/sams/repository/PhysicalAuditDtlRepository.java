package com.sams.repository;

import com.sams.entity.PhysicalAuditDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhysicalAuditDtlRepository extends JpaRepository<PhysicalAuditDtl, Long> {
}