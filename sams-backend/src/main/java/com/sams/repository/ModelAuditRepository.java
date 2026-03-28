package com.sams.repository;

import com.sams.entity.ModelAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelAuditRepository extends JpaRepository<ModelAudit, Long> {
}