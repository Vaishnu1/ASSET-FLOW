package com.sams.repository;

import com.sams.entity.AssetSwDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetSwDtlRepository extends JpaRepository<AssetSwDtl, Long> {
}