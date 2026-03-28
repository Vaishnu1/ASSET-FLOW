package com.sams.repository;

import com.sams.entity.AssetGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetGroupRepository extends JpaRepository<AssetGroup, Long> {
}