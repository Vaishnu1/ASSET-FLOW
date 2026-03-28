package com.sams.repository;

import com.sams.entity.BudgetHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetHdrRepository extends JpaRepository<BudgetHdr, Long> {
}