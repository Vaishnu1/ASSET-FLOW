package com.sams.repository;

import com.sams.entity.subDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface subDepartmentRepository extends JpaRepository<subDepartment, Long> {
}