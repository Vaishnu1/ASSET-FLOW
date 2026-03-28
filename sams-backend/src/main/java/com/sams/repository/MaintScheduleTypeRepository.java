package com.sams.repository;

import com.sams.entity.MaintScheduleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintScheduleTypeRepository extends JpaRepository<MaintScheduleType, Long> {
}