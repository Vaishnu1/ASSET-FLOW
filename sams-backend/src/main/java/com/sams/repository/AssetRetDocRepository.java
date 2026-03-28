package com.sams.repository;

import com.sams.entity.AssetRetDoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRetDocRepository extends JpaRepository<AssetRetDoc, Long> {
}