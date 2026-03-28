package com.sams.repository;

import com.sams.entity.ContractWarranty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractWarrantyRepository extends JpaRepository<ContractWarranty, Long> {
}