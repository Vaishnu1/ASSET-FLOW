package com.sams.repository;

import com.sams.entity.BuildingRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingRoomRepository extends JpaRepository<BuildingRoom, Long> {
}