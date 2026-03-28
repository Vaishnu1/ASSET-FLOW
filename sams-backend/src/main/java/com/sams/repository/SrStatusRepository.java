package com.sams.repository;

import com.sams.entity.SrStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrStatusRepository extends JpaRepository<SrStatus, Long> {
}