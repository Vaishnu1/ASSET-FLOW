package com.sams.repository;

import com.sams.entity.SrTatTemp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrTatTempRepository extends JpaRepository<SrTatTemp, Long> {
}