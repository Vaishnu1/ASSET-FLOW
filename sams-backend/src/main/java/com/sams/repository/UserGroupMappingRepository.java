package com.sams.repository;

import com.sams.entity.UserGroupMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserGroupMappingRepository extends JpaRepository<UserGroupMapping, Long> {
}