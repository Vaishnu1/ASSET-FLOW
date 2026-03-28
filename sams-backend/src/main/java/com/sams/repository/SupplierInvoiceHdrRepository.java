package com.sams.repository;

import com.sams.entity.SupplierInvoiceHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierInvoiceHdrRepository extends JpaRepository<SupplierInvoiceHdr, Long> {
}