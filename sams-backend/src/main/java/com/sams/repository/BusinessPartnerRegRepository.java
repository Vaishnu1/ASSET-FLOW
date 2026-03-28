package com.sams.repository;

import com.sams.entity.BusinessPartnerReg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessPartnerRegRepository extends JpaRepository<BusinessPartnerReg, Long> {
}