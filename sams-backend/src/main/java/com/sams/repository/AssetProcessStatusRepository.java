package com.sams.repository;

import com.sams.entity.AssetProcessStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetProcessStatusRepository extends JpaRepository<AssetProcessStatus, Long> {
}