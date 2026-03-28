package com.sams.repository;

import com.sams.entity.EmailTemplateConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailTemplateConfigurationRepository extends JpaRepository<EmailTemplateConfiguration, Long> {
}