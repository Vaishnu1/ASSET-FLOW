package com.sams.repository;

import com.sams.entity.PurchaseProcess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseProcessRepository extends JpaRepository<PurchaseProcess, Long> {
}