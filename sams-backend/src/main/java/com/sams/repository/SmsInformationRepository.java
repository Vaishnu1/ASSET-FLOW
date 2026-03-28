package com.sams.repository;

import com.sams.entity.SmsInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SmsInformationRepository extends JpaRepository<SmsInformation, Long> {
}