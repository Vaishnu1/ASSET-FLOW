package com.sams.repository;

import com.sams.entity.EmailProcesses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailProcessesRepository extends JpaRepository<EmailProcesses, Long> {
}