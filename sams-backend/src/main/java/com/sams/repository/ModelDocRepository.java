package com.sams.repository;

import com.sams.entity.ModelDoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelDocRepository extends JpaRepository<ModelDoc, Long> {
}