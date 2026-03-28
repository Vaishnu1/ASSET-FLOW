package com.sams.repository;

import com.sams.entity.SrTrainingEmployee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrTrainingEmployeeRepository extends JpaRepository<SrTrainingEmployee, Long> {
}