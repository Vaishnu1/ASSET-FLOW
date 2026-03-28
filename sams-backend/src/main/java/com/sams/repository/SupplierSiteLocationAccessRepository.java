package com.sams.repository;

import com.sams.entity.SupplierSiteLocationAccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierSiteLocationAccessRepository extends JpaRepository<SupplierSiteLocationAccess, Long> {
}