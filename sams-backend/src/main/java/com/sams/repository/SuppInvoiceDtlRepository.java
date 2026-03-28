package com.sams.repository;

import com.sams.entity.SuppInvoiceDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuppInvoiceDtlRepository extends JpaRepository<SuppInvoiceDtl, Long> {
}