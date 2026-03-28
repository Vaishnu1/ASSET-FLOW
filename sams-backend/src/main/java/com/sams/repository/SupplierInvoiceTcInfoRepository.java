package com.sams.repository;

import com.sams.entity.SupplierInvoiceTcInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierInvoiceTcInfoRepository extends JpaRepository<SupplierInvoiceTcInfo, Long> {
}