package com.sams.repository;

import com.sams.entity.ContractDetailAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractDetailAssetRepository extends JpaRepository<ContractDetailAsset, Long> {
}