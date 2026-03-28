package com.sams.repository;

import com.sams.entity.PrinterLabelTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrinterLabelTemplateRepository extends JpaRepository<PrinterLabelTemplate, Long> {
}