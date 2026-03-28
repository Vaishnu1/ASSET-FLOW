package com.sams.repository;

import com.sams.entity.SupplierModelSupplied;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierModelSuppliedRepository extends JpaRepository<SupplierModelSupplied, Long> {
}