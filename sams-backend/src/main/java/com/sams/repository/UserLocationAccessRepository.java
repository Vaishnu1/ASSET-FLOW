package com.sams.repository;

import com.sams.entity.UserLocationAccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLocationAccessRepository extends JpaRepository<UserLocationAccess, Long> {
}