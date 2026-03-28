package com.sams.repository;

import com.sams.entity.MaintenanceStrategy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintenanceStrategyRepository extends JpaRepository<MaintenanceStrategy, Long> {
}