package com.sams.repository;

import com.sams.entity.WorkFlowHierarchyHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkFlowHierarchyHdrRepository extends JpaRepository<WorkFlowHierarchyHdr, Long> {
}