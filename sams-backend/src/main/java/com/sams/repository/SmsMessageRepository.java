package com.sams.repository;

import com.sams.entity.SmsMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SmsMessageRepository extends JpaRepository<SmsMessage, Long> {
}