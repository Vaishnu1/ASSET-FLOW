package com.sams.repository;

import com.sams.entity.InventoryAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryAuditRepository extends JpaRepository<InventoryAudit, Long> {
}