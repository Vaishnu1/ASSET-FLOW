package com.sams.repository;

import com.sams.entity.AssetMaintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetMaintenanceRepository extends JpaRepository<AssetMaintenance, Long> {
}