package com.sams.repository;

import com.sams.entity.ParameterType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParameterTypeRepository extends JpaRepository<ParameterType, Long> {
}