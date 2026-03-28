package com.sams.repository;

import com.sams.entity.departmentDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface departmentDtlRepository extends JpaRepository<departmentDtl, Long> {
}