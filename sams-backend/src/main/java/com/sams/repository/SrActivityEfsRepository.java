package com.sams.repository;

import com.sams.entity.SrActivityEfs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrActivityEfsRepository extends JpaRepository<SrActivityEfs, Long> {
}