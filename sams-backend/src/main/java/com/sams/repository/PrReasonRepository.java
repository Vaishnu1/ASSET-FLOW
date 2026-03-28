package com.sams.repository;

import com.sams.entity.PrReason;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrReasonRepository extends JpaRepository<PrReason, Long> {
}