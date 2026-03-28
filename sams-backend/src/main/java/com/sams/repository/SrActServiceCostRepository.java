package com.sams.repository;

import com.sams.entity.SrActServiceCost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrActServiceCostRepository extends JpaRepository<SrActServiceCost, Long> {
}