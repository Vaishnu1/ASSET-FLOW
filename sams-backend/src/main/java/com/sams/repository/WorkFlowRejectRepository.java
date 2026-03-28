package com.sams.repository;

import com.sams.entity.WorkFlowReject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkFlowRejectRepository extends JpaRepository<WorkFlowReject, Long> {
}