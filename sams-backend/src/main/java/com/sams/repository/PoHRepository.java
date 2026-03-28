package com.sams.repository;

import com.sams.entity.PoH;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoHRepository extends JpaRepository<PoH, Long> {
}