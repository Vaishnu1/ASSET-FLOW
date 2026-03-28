package com.sams.repository;

import com.sams.entity.PurchaseTcTemplateDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseTcTemplateDtlRepository extends JpaRepository<PurchaseTcTemplateDtl, Long> {
}