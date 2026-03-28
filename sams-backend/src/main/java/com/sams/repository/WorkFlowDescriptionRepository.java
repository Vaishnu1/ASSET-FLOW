package com.sams.repository;

import com.sams.entity.WorkFlowDescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkFlowDescriptionRepository extends JpaRepository<WorkFlowDescription, Long> {
}