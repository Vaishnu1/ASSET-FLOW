package com.sams.repository;

import com.sams.entity.CustomFieldsDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomFieldsDtlRepository extends JpaRepository<CustomFieldsDtl, Long> {
}