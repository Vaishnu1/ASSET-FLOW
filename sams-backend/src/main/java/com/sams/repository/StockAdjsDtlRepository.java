package com.sams.repository;

import com.sams.entity.StockAdjsDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockAdjsDtlRepository extends JpaRepository<StockAdjsDtl, Long> {
}