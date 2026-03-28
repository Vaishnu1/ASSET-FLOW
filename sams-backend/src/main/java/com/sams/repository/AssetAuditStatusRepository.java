package com.sams.repository;

import com.sams.entity.AssetAuditStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetAuditStatusRepository extends JpaRepository<AssetAuditStatus, Long> {
}