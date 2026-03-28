package com.sams.repository;

import com.sams.entity.AssetGroupStatCertificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetGroupStatCertificateRepository extends JpaRepository<AssetGroupStatCertificate, Long> {
}