package com.sams.repository;

import com.sams.entity.GatePassPurpose;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GatePassPurposeRepository extends JpaRepository<GatePassPurpose, Long> {
}