package com.sams.repository;

import com.sams.entity.BudgetDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetDtlRepository extends JpaRepository<BudgetDtl, Long> {
}