package com.sams.repository;

import com.sams.entity.AssetRelocate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRelocateRepository extends JpaRepository<AssetRelocate, Long> {
}