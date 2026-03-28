package com.sams.repository;

import com.sams.entity.PurchasingUsage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchasingUsageRepository extends JpaRepository<PurchasingUsage, Long> {
}