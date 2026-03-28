package com.sams.repository;

import com.sams.entity.InsuranceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsuranceTypeRepository extends JpaRepository<InsuranceType, Long> {
}