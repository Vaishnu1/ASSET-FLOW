package com.sams.repository;

import com.sams.entity.PurchasingType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchasingTypeRepository extends JpaRepository<PurchasingType, Long> {
}