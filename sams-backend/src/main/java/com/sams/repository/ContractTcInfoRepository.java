package com.sams.repository;

import com.sams.entity.ContractTcInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractTcInfoRepository extends JpaRepository<ContractTcInfo, Long> {
}