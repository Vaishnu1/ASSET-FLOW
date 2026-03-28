package com.sams.repository;

import com.sams.entity.CoverageType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoverageTypeRepository extends JpaRepository<CoverageType, Long> {
}