package com.sams.repository;

import com.sams.entity.OrderReason;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderReasonRepository extends JpaRepository<OrderReason, Long> {
}