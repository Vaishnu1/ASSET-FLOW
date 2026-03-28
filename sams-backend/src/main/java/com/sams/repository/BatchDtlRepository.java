package com.sams.repository;

import com.sams.entity.BatchDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BatchDtlRepository extends JpaRepository<BatchDtl, Long> {
}