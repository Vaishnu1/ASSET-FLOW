package com.sams.repository;

import com.sams.entity.PreInwStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreInwStatusRepository extends JpaRepository<PreInwStatus, Long> {
}