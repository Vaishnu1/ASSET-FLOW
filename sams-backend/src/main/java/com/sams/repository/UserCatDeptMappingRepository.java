package com.sams.repository;

import com.sams.entity.UserCatDeptMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCatDeptMappingRepository extends JpaRepository<UserCatDeptMapping, Long> {
}