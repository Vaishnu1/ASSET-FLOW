package com.sams.repository;

import com.sams.entity.AccCon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccConRepository extends JpaRepository<AccCon, Long> {
}