package com.sams.repository;

import com.sams.entity.AssetGroupMaintenanceSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetGroupMaintenanceScheduleRepository extends JpaRepository<AssetGroupMaintenanceSchedule, Long> {
}