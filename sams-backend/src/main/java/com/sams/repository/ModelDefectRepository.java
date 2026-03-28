package com.sams.repository;

import com.sams.entity.ModelDefect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelDefectRepository extends JpaRepository<ModelDefect, Long> {
}