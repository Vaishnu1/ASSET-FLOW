package com.sams.repository;

import com.sams.entity.SrSubStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrSubStatusRepository extends JpaRepository<SrSubStatus, Long> {
}