package com.sams.repository;

import com.sams.entity.AssetAssigneeAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetAssigneeAuditRepository extends JpaRepository<AssetAssigneeAudit, Long> {
}