package com.sams.repository;

import com.sams.entity.BusinessPartnerRoles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessPartnerRolesRepository extends JpaRepository<BusinessPartnerRoles, Long> {
}