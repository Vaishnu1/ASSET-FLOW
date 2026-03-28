package com.sams.repository;

import com.sams.entity.BuildingSegment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingSegmentRepository extends JpaRepository<BuildingSegment, Long> {
}