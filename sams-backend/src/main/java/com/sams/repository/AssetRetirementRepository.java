package com.sams.repository;

import com.sams.entity.AssetRetirement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRetirementRepository extends JpaRepository<AssetRetirement, Long> {
}