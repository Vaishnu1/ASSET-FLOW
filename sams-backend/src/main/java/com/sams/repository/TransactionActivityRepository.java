package com.sams.repository;

import com.sams.entity.TransactionActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionActivityRepository extends JpaRepository<TransactionActivity, Long> {
}