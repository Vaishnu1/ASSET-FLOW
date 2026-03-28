package com.sams.repository;

import com.sams.entity.AssetInfoAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetInfoAuditRepository extends JpaRepository<AssetInfoAudit, Long> {
}