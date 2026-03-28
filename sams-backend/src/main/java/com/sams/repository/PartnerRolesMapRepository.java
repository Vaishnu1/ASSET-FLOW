package com.sams.repository;

import com.sams.entity.PartnerRolesMap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartnerRolesMapRepository extends JpaRepository<PartnerRolesMap, Long> {
}