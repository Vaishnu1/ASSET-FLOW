package com.sams.repository;

import com.sams.entity.SupplierInvoiceDoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierInvoiceDocRepository extends JpaRepository<SupplierInvoiceDoc, Long> {
}