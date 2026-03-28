package com.sams.repository;

import com.sams.entity.LocAssetCodeGeneration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocAssetCodeGenerationRepository extends JpaRepository<LocAssetCodeGeneration, Long> {
}