package com.sams.repository;

import com.sams.entity.RetirementReasons;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RetirementReasonsRepository extends JpaRepository<RetirementReasons, Long> {
}