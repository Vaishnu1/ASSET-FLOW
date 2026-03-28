package com.sams.repository;

import com.sams.entity.BuildingFloor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingFloorRepository extends JpaRepository<BuildingFloor, Long> {
}