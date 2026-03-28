package com.sams.repository;

import com.sams.entity.CertificationAuthority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificationAuthorityRepository extends JpaRepository<CertificationAuthority, Long> {
}