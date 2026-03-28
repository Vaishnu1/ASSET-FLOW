package com.sams.repository;

import com.sams.entity.GrnFor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrnForRepository extends JpaRepository<GrnFor, Long> {
}