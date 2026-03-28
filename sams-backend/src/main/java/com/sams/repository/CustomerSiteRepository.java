package com.sams.repository;

import com.sams.entity.CustomerSite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerSiteRepository extends JpaRepository<CustomerSite, Long> {
}