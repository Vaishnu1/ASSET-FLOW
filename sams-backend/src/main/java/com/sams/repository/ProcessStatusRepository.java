package com.sams.repository;

import com.sams.entity.ProcessStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcessStatusRepository extends JpaRepository<ProcessStatus, Long> {
}