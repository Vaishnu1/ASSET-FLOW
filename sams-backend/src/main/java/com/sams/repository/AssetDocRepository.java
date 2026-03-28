package com.sams.repository;

import com.sams.entity.AssetDoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetDocRepository extends JpaRepository<AssetDoc, Long> {
}