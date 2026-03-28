package com.sams.repository;

import com.sams.entity.WorkFlowProcess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkFlowProcessRepository extends JpaRepository<WorkFlowProcess, Long> {
}