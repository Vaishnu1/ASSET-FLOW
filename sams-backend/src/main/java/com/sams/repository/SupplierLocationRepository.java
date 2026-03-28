package com.sams.repository;

import com.sams.entity.SupplierLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierLocationRepository extends JpaRepository<SupplierLocation, Long> {
}