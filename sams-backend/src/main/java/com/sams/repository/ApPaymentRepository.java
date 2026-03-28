package com.sams.repository;

import com.sams.entity.ApPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApPaymentRepository extends JpaRepository<ApPayment, Long> {
}