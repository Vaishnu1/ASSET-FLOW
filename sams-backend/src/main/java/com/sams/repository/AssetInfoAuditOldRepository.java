package com.sams.repository;

import com.sams.entity.AssetInfoAuditOld;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetInfoAuditOldRepository extends JpaRepository<AssetInfoAuditOld, Long> {
}