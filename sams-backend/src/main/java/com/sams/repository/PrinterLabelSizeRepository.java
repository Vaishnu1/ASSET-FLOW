package com.sams.repository;

import com.sams.entity.PrinterLabelSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrinterLabelSizeRepository extends JpaRepository<PrinterLabelSize, Long> {
}