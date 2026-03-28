package com.sams.repository;

import com.sams.entity.BatchHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BatchHdrRepository extends JpaRepository<BatchHdr, Long> {
}