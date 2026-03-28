package com.sams.repository;

import com.sams.entity.ContractAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractAssetRepository extends JpaRepository<ContractAsset, Long> {
}