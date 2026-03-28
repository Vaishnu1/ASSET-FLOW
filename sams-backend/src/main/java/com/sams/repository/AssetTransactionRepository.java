package com.sams.repository;

import com.sams.entity.AssetTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetTransactionRepository extends JpaRepository<AssetTransaction, Long> {
}