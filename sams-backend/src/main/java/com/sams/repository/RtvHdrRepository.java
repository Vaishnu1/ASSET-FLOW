package com.sams.repository;

import com.sams.entity.RtvHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RtvHdrRepository extends JpaRepository<RtvHdr, Long> {
}