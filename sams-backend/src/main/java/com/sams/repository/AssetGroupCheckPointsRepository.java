package com.sams.repository;

import com.sams.entity.AssetGroupCheckPoints;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetGroupCheckPointsRepository extends JpaRepository<AssetGroupCheckPoints, Long> {
}