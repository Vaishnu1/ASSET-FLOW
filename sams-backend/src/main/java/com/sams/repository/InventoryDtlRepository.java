package com.sams.repository;

import com.sams.entity.InventoryDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryDtlRepository extends JpaRepository<InventoryDtl, Long> {
}