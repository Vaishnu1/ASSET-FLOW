package com.sams.repository;

import com.sams.entity.EmployeeExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeExperienceRepository extends JpaRepository<EmployeeExperience, Long> {
}