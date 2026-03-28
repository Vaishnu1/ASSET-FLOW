package com.sams.repository;

import com.sams.entity.AssetCheckPoints;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetCheckPointsRepository extends JpaRepository<AssetCheckPoints, Long> {
}