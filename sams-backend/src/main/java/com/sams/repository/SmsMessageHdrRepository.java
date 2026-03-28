package com.sams.repository;

import com.sams.entity.SmsMessageHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SmsMessageHdrRepository extends JpaRepository<SmsMessageHdr, Long> {
}