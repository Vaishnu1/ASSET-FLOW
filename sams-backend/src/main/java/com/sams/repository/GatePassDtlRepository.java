package com.sams.repository;

import com.sams.entity.GatePassDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GatePassDtlRepository extends JpaRepository<GatePassDtl, Long> {
}