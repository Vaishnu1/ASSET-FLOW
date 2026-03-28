package com.sams.repository;

import com.sams.entity.PreInwAssetHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreInwAssetHdrRepository extends JpaRepository<PreInwAssetHdr, Long> {
}