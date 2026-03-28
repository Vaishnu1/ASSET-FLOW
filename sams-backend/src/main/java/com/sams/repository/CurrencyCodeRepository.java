package com.sams.repository;

import com.sams.entity.CurrencyCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurrencyCodeRepository extends JpaRepository<CurrencyCode, Long> {
}