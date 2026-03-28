package com.sams.repository;

import com.sams.entity.LocModuleTabAccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocModuleTabAccessRepository extends JpaRepository<LocModuleTabAccess, Long> {
}