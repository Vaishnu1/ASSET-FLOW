package com.sams.repository;

import com.sams.entity.LoanChildAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanChildAssetRepository extends JpaRepository<LoanChildAsset, Long> {
}