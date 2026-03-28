package com.sams.repository;

import com.sams.entity.LocDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocDepartmentRepository extends JpaRepository<LocDepartment, Long> {
}