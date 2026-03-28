package com.sams.repository;

import com.sams.entity.VolumeLicense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VolumeLicenseRepository extends JpaRepository<VolumeLicense, Long> {
}