package com.sams.repository;

import com.sams.entity.AssetAssigneeAuditOld;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetAssigneeAuditOldRepository extends JpaRepository<AssetAssigneeAuditOld, Long> {
}