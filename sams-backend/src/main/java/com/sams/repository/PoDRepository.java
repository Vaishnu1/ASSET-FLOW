package com.sams.repository;

import com.sams.entity.PoD;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoDRepository extends JpaRepository<PoD, Long> {
}