package com.sams.repository;

import com.sams.entity.SrSubStatusInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrSubStatusInfoRepository extends JpaRepository<SrSubStatusInfo, Long> {
}