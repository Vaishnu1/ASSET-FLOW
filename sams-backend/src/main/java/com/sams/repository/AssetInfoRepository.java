package com.sams.repository;

import com.sams.entity.AssetInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetInfoRepository extends JpaRepository<AssetInfo, Long> {
}