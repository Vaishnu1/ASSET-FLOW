package com.sams.repository;

import com.sams.entity.AssetStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetStatusRepository extends JpaRepository<AssetStatus, Long> {
}