package com.sams.repository;

import com.sams.entity.StockIndentHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockIndentHdrRepository extends JpaRepository<StockIndentHdr, Long> {
}