package com.sams.repository;

import com.sams.entity.CheckPoints;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckPointsRepository extends JpaRepository<CheckPoints, Long> {
}