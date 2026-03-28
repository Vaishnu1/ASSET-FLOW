package com.sams.repository;

import com.sams.entity.WorkFlowEmailTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkFlowEmailTemplateRepository extends JpaRepository<WorkFlowEmailTemplate, Long> {
}