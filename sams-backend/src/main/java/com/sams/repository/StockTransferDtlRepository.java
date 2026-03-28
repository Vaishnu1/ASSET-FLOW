package com.sams.repository;

import com.sams.entity.StockTransferDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockTransferDtlRepository extends JpaRepository<StockTransferDtl, Long> {
}