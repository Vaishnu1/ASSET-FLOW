package com.sams.repository;

import com.sams.entity.MaintScheduleFrequency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintScheduleFrequencyRepository extends JpaRepository<MaintScheduleFrequency, Long> {
}