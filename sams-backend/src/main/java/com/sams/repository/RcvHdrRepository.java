package com.sams.repository;

import com.sams.entity.RcvHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RcvHdrRepository extends JpaRepository<RcvHdr, Long> {
}