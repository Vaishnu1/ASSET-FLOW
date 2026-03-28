package com.sams.repository;

import com.sams.entity.SupplierInvoicePayments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierInvoicePaymentsRepository extends JpaRepository<SupplierInvoicePayments, Long> {
}