package com.sams.repository;

import com.sams.entity.PoPriceDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoPriceDtlRepository extends JpaRepository<PoPriceDtl, Long> {
}