package com.sams.repository;

import com.sams.entity.LoanStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanStatusRepository extends JpaRepository<LoanStatus, Long> {
}