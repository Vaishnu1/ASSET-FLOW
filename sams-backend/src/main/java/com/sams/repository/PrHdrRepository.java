package com.sams.repository;

import com.sams.entity.PrHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrHdrRepository extends JpaRepository<PrHdr, Long> {
}