package com.sams.repository;

import com.sams.entity.AssetCustFieldValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetCustFieldValueRepository extends JpaRepository<AssetCustFieldValue, Long> {
}