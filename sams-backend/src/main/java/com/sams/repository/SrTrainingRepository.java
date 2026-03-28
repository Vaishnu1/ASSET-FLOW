package com.sams.repository;

import com.sams.entity.SrTraining;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrTrainingRepository extends JpaRepository<SrTraining, Long> {
}