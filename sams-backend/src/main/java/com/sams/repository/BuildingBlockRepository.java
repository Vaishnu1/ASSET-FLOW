package com.sams.repository;

import com.sams.entity.BuildingBlock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingBlockRepository extends JpaRepository<BuildingBlock, Long> {
}