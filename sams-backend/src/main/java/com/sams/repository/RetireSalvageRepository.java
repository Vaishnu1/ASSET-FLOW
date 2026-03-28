package com.sams.repository;

import com.sams.entity.RetireSalvage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RetireSalvageRepository extends JpaRepository<RetireSalvage, Long> {
}