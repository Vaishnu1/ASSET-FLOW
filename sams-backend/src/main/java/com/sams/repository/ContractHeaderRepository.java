package com.sams.repository;

import com.sams.entity.ContractHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractHeaderRepository extends JpaRepository<ContractHeader, Long> {
}