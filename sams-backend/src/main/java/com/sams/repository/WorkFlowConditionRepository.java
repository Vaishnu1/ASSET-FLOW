package com.sams.repository;

import com.sams.entity.WorkFlowCondition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkFlowConditionRepository extends JpaRepository<WorkFlowCondition, Long> {
}