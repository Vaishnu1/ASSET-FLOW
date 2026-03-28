package com.sams.repository;

import com.sams.entity.SupplierSiteReg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierSiteRegRepository extends JpaRepository<SupplierSiteReg, Long> {
}