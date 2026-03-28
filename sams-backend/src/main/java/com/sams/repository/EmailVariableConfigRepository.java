package com.sams.repository;

import com.sams.entity.EmailVariableConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailVariableConfigRepository extends JpaRepository<EmailVariableConfig, Long> {
}