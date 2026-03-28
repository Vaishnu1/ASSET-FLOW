package com.sams.repository;

import com.sams.entity.WarehouseType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WarehouseTypeRepository extends JpaRepository<WarehouseType, Long> {
}