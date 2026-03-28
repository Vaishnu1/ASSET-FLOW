package com.sams.repository;

import com.sams.entity.EmailInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailInformationRepository extends JpaRepository<EmailInformation, Long> {
}