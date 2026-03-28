package com.sams.repository;

import com.sams.entity.UserPrefernce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPrefernceRepository extends JpaRepository<UserPrefernce, Long> {
}