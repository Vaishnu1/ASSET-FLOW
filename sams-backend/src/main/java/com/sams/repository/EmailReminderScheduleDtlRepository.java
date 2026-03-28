package com.sams.repository;

import com.sams.entity.EmailReminderScheduleDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailReminderScheduleDtlRepository extends JpaRepository<EmailReminderScheduleDtl, Long> {
}