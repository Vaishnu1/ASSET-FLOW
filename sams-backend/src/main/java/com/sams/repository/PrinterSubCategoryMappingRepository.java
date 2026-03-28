package com.sams.repository;

import com.sams.entity.PrinterSubCategoryMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrinterSubCategoryMappingRepository extends JpaRepository<PrinterSubCategoryMapping, Long> {
}