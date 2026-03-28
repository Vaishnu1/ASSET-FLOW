package com.sams.repository;

import com.sams.entity.BudgetCapexDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetCapexDtlRepository extends JpaRepository<BudgetCapexDtl, Long> {
}