package com.sams.repository;

import com.sams.entity.SrActivityFindings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrActivityFindingsRepository extends JpaRepository<SrActivityFindings, Long> {
}