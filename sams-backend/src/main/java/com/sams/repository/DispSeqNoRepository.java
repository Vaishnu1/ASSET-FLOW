package com.sams.repository;

import com.sams.entity.DispSeqNo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DispSeqNoRepository extends JpaRepository<DispSeqNo, Long> {
}