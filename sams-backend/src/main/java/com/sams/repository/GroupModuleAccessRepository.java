package com.sams.repository;

import com.sams.entity.GroupModuleAccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupModuleAccessRepository extends JpaRepository<GroupModuleAccess, Long> {
}