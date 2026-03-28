package com.sams.repository;

import com.sams.entity.AssetPhysicalAuditHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetPhysicalAuditHdrRepository extends JpaRepository<AssetPhysicalAuditHdr, Long> {
}