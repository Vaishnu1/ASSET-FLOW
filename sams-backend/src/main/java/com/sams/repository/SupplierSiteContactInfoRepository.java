package com.sams.repository;

import com.sams.entity.SupplierSiteContactInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierSiteContactInfoRepository extends JpaRepository<SupplierSiteContactInfo, Long> {
}