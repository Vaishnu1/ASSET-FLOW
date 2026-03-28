package com.sams.repository;

import com.sams.entity.ModelImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelImageRepository extends JpaRepository<ModelImage, Long> {
}