package com.sams.repository;

import com.sams.entity.LoanAssetAccessories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanAssetAccessoriesRepository extends JpaRepository<LoanAssetAccessories, Long> {
}