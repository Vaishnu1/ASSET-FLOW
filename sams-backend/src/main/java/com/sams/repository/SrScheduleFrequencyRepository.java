package com.sams.repository;

import com.sams.entity.SrScheduleFrequency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrScheduleFrequencyRepository extends JpaRepository<SrScheduleFrequency, Long> {
}