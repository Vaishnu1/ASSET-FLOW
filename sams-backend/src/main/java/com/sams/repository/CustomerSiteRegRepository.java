package com.sams.repository;

import com.sams.entity.CustomerSiteReg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerSiteRegRepository extends JpaRepository<CustomerSiteReg, Long> {
}