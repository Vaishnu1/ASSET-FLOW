package com.sams.repository;

import com.sams.entity.Lock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LockRepository extends JpaRepository<Lock, Long> {
}