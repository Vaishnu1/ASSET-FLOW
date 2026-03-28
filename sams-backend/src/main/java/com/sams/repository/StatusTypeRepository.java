package com.sams.repository;

import com.sams.entity.StatusType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusTypeRepository extends JpaRepository<StatusType, Long> {
}