package com.sams.repository;

import com.sams.entity.RetireBuyBack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RetireBuyBackRepository extends JpaRepository<RetireBuyBack, Long> {
}