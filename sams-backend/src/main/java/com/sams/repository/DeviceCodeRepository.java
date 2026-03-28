package com.sams.repository;

import com.sams.entity.DeviceCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceCodeRepository extends JpaRepository<DeviceCode, Long> {
}