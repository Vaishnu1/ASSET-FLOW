package com.sams.repository;

import com.sams.entity.ParameterGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParameterGroupRepository extends JpaRepository<ParameterGroup, Long> {
}