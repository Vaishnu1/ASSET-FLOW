package com.sams.repository;

import com.sams.entity.PrDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrDtlRepository extends JpaRepository<PrDtl, Long> {
}