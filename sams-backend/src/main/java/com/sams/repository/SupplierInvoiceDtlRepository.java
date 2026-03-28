package com.sams.repository;

import com.sams.entity.SupplierInvoiceDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierInvoiceDtlRepository extends JpaRepository<SupplierInvoiceDtl, Long> {
}