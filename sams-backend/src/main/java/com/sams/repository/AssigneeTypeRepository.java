package com.sams.repository;

import com.sams.entity.AssigneeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssigneeTypeRepository extends JpaRepository<AssigneeType, Long> {
}