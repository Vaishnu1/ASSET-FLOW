package com.sams.repository;

import com.sams.entity.CustomerSiteLocationAccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerSiteLocationAccessRepository extends JpaRepository<CustomerSiteLocationAccess, Long> {
}