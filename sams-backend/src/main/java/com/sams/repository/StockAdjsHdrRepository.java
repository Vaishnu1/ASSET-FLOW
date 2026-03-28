package com.sams.repository;

import com.sams.entity.StockAdjsHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockAdjsHdrRepository extends JpaRepository<StockAdjsHdr, Long> {
}