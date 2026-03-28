package com.sams.repository;

import com.sams.entity.SupplierSite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierSiteRepository extends JpaRepository<SupplierSite, Long> {
}