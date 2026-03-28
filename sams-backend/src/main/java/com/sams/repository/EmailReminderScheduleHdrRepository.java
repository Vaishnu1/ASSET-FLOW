package com.sams.repository;

import com.sams.entity.EmailReminderScheduleHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailReminderScheduleHdrRepository extends JpaRepository<EmailReminderScheduleHdr, Long> {
}