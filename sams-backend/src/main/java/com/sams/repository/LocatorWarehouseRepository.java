package com.sams.repository;

import com.sams.entity.LocatorWarehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocatorWarehouseRepository extends JpaRepository<LocatorWarehouse, Long> {
}