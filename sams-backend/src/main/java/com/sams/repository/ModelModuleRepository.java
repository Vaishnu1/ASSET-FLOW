package com.sams.repository;

import com.sams.entity.ModelModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelModuleRepository extends JpaRepository<ModelModule, Long> {
}