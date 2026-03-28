package com.sams.repository;

import com.sams.entity.AssetPhysicalAuditDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetPhysicalAuditDtlRepository extends JpaRepository<AssetPhysicalAuditDtl, Long> {
}