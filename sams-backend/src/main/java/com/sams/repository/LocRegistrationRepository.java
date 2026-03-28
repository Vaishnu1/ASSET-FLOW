package com.sams.repository;

import com.sams.entity.LocRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocRegistrationRepository extends JpaRepository<LocRegistration, Long> {
}