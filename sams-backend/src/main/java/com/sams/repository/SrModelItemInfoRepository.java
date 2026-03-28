package com.sams.repository;

import com.sams.entity.SrModelItemInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrModelItemInfoRepository extends JpaRepository<SrModelItemInfo, Long> {
}