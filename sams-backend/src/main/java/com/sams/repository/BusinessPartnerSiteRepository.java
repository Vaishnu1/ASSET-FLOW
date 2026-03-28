package com.sams.repository;

import com.sams.entity.BusinessPartnerSite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessPartnerSiteRepository extends JpaRepository<BusinessPartnerSite, Long> {
}