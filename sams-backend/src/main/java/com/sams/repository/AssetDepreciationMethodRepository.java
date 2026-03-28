package com.sams.repository;

import com.sams.entity.AssetDepreciationMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetDepreciationMethodRepository extends JpaRepository<AssetDepreciationMethod, Long> {
}