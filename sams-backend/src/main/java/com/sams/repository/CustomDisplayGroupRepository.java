package com.sams.repository;

import com.sams.entity.CustomDisplayGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomDisplayGroupRepository extends JpaRepository<CustomDisplayGroup, Long> {
}