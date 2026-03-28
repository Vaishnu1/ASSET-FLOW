package com.sams.repository;

import com.sams.entity.LegalEntityReg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LegalEntityRegRepository extends JpaRepository<LegalEntityReg, Long> {
}