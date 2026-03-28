package com.sams.repository;

import com.sams.entity.RcvDtlLines;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RcvDtlLinesRepository extends JpaRepository<RcvDtlLines, Long> {
}