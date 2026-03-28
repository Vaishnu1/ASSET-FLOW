package com.sams.repository;

import com.sams.entity.ModelCheckPoints;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelCheckPointsRepository extends JpaRepository<ModelCheckPoints, Long> {
}