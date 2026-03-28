package com.sams.repository;

import com.sams.entity.SrEscalation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrEscalationRepository extends JpaRepository<SrEscalation, Long> {
}