package com.sams.repository;

import com.sams.entity.PoTermsAndConditions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoTermsAndConditionsRepository extends JpaRepository<PoTermsAndConditions, Long> {
}