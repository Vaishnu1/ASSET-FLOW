package com.sams.repository;

import com.sams.entity.InstallHandoverInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstallHandoverInfoRepository extends JpaRepository<InstallHandoverInfo, Long> {
}