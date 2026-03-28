package com.sams.repository;

import com.sams.entity.ContractPaymentTenure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractPaymentTenureRepository extends JpaRepository<ContractPaymentTenure, Long> {
}