package com.sams.repository;

import com.sams.entity.GrnDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrnDtlRepository extends JpaRepository<GrnDtl, Long> {
}