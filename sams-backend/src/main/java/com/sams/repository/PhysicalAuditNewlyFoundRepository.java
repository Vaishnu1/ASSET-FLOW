package com.sams.repository;

import com.sams.entity.PhysicalAuditNewlyFound;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhysicalAuditNewlyFoundRepository extends JpaRepository<PhysicalAuditNewlyFound, Long> {
}