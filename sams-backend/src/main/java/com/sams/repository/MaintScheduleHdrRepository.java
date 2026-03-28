package com.sams.repository;

import com.sams.entity.MaintScheduleHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintScheduleHdrRepository extends JpaRepository<MaintScheduleHdr, Long> {
}