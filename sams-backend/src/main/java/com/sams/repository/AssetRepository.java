package com.sams.repository;

import com.sams.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    Optional<Asset> findBySerialNumber(String serialNumber);
    boolean existsBySerialNumber(String serialNumber);
}
