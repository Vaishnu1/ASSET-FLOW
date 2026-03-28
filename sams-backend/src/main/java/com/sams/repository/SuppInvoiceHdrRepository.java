package com.sams.repository;

import com.sams.entity.SuppInvoiceHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuppInvoiceHdrRepository extends JpaRepository<SuppInvoiceHdr, Long> {
}