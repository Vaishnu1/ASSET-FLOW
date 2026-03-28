package com.sams.repository;

import com.sams.entity.SrHandOverInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrHandOverInfoRepository extends JpaRepository<SrHandOverInfo, Long> {
}