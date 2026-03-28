package com.sams.repository;

import com.sams.entity.SrCheckPoints;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrCheckPointsRepository extends JpaRepository<SrCheckPoints, Long> {
}