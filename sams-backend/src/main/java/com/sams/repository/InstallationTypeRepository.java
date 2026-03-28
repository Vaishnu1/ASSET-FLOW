package com.sams.repository;

import com.sams.entity.InstallationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstallationTypeRepository extends JpaRepository<InstallationType, Long> {
}