package com.sams.repository;

import com.sams.entity.StockIndentDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockIndentDtlRepository extends JpaRepository<StockIndentDtl, Long> {
}