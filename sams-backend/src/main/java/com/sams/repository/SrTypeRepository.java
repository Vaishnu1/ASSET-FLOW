package com.sams.repository;

import com.sams.entity.SrType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrTypeRepository extends JpaRepository<SrType, Long> {
}