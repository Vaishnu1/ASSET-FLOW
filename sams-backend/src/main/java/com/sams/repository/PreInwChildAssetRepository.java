package com.sams.repository;

import com.sams.entity.PreInwChildAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreInwChildAssetRepository extends JpaRepository<PreInwChildAsset, Long> {
}