package com.sams.repository;

import com.sams.entity.AssetGroupDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetGroupDtlRepository extends JpaRepository<AssetGroupDtl, Long> {
}