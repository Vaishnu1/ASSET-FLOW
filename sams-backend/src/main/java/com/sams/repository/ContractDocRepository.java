package com.sams.repository;

import com.sams.entity.ContractDoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractDocRepository extends JpaRepository<ContractDoc, Long> {
}