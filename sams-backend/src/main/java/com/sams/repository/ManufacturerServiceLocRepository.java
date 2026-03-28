package com.sams.repository;

import com.sams.entity.ManufacturerServiceLoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManufacturerServiceLocRepository extends JpaRepository<ManufacturerServiceLoc, Long> {
}