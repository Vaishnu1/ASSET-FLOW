package com.sams.repository;

import com.sams.entity.AssetInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetInventoryRepository extends JpaRepository<AssetInventory, Long> {
}