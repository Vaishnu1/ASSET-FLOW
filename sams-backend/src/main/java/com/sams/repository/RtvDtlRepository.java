package com.sams.repository;

import com.sams.entity.RtvDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RtvDtlRepository extends JpaRepository<RtvDtl, Long> {
}