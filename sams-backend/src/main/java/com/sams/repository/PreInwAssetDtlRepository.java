package com.sams.repository;

import com.sams.entity.PreInwAssetDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreInwAssetDtlRepository extends JpaRepository<PreInwAssetDtl, Long> {
}