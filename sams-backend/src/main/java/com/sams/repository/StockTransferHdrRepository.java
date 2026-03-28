package com.sams.repository;

import com.sams.entity.StockTransferHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockTransferHdrRepository extends JpaRepository<StockTransferHdr, Long> {
}