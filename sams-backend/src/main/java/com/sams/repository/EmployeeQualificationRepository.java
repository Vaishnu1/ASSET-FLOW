package com.sams.repository;

import com.sams.entity.EmployeeQualification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeQualificationRepository extends JpaRepository<EmployeeQualification, Long> {
}