package com.sams.repository;

import com.sams.entity.ModelTechnicalSpecialist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelTechnicalSpecialistRepository extends JpaRepository<ModelTechnicalSpecialist, Long> {
}