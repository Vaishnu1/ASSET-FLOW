package com.sams.repository;

import com.sams.entity.SrTrainingDoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrTrainingDocRepository extends JpaRepository<SrTrainingDoc, Long> {
}