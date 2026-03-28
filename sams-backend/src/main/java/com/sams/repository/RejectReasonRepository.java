package com.sams.repository;

import com.sams.entity.RejectReason;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RejectReasonRepository extends JpaRepository<RejectReason, Long> {
}