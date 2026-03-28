package com.sams.repository;

import com.sams.entity.PurchaseTcParameters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseTcParametersRepository extends JpaRepository<PurchaseTcParameters, Long> {
}