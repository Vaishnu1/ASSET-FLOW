package com.sams.repository;

import com.sams.entity.ModelSelfCheck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelSelfCheckRepository extends JpaRepository<ModelSelfCheck, Long> {
}