package com.sams.repository;

import com.sams.entity.PreInwContractWarranty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreInwContractWarrantyRepository extends JpaRepository<PreInwContractWarranty, Long> {
}