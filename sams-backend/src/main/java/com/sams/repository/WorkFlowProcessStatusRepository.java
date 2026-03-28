package com.sams.repository;

import com.sams.entity.WorkFlowProcessStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkFlowProcessStatusRepository extends JpaRepository<WorkFlowProcessStatus, Long> {
}