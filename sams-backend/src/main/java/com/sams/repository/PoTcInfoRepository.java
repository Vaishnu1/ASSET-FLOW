package com.sams.repository;

import com.sams.entity.PoTcInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoTcInfoRepository extends JpaRepository<PoTcInfo, Long> {
}