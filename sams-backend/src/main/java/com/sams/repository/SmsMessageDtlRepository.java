package com.sams.repository;

import com.sams.entity.SmsMessageDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SmsMessageDtlRepository extends JpaRepository<SmsMessageDtl, Long> {
}